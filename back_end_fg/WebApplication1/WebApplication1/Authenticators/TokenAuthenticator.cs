using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Net.Http;
using System.Security.Claims;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http.Filters;

namespace WebApplication1.Authenticators
{
    public class TokenAuthenticator : Attribute, IAuthenticationFilter
    {
        static string ServerName = System.Net.Dns.GetHostName();
        static string ConnectionStringID =
                (ServerName == "TFNSSC07") ? "LocalConnection" : "DefaultConnection";

        private readonly string domain;

        public bool AllowMultiple
        {
            get
            {
                return false;
            }
        }

        public TokenAuthenticator(string Domain)
        {
            this.domain = "realm=" + Domain;
        }


        public Task AuthenticateAsync(HttpAuthenticationContext context, CancellationToken cancellationToken)
        {
            
            HttpRequestMessage requestMessage = context.Request;

            if(requestMessage.Headers.Authorization != null)
            {
                if (requestMessage.Headers.Authorization.Scheme.Equals("bearer", StringComparison.OrdinalIgnoreCase))
                {
                    string role = "";
                    string token = requestMessage.Headers.Authorization.Parameter.ToString();
                    var jwt = new JwtSecurityToken(token);
                    string user = jwt.Claims.First(c => c.Type == "pseudo").Value.ToString().Trim();
                    string pwd = jwt.Claims.First(c => c.Type == "password").Value.ToString().Trim();

                    using (SqlConnection c = new SqlConnection())
                    {
                        c.ConnectionString = ConfigurationManager.ConnectionStrings[ConnectionStringID].ConnectionString;
                        using (SqlCommand cmd = c.CreateCommand())
                        {
                            cmd.CommandText = "SELECT r.RoleName From WimsUser as w " +
                                "Join Role as r On w.RoleId = r.Id " +
                                "Where w.Pseudo = @pseudo AND w.Pswd = @pswd";

                            cmd.Parameters.Add("@pseudo", SqlDbType.NChar);
                            cmd.Parameters["@pseudo"].Value = user;
                            cmd.Parameters.Add("@pswd", SqlDbType.NChar);
                            cmd.Parameters["@pswd"].Value = pwd;

                            c.Open();
                            role = (string)cmd.ExecuteScalar().ToString().Trim();
                            c.Close();
                        }
                    }

                    if (role.Equals("admin", StringComparison.OrdinalIgnoreCase))
                    {
                        var claims = new List<Claim>()
                        {
                            new Claim(ClaimTypes.Name, user),
                            new Claim(ClaimTypes.Role, role)
                        };

                        var claimsIdentity = new ClaimsIdentity(claims, "Bearer");
                        context.Principal = new ClaimsPrincipal(new[] { claimsIdentity });
                    }
                    else
                    {
                        context.ErrorResult = new AuthenticationFailureResult("not the rights", requestMessage);
                    }

                }
            }
            else
            {
                context.ErrorResult = new AuthenticationFailureResult("invalid request", requestMessage);
            }

            return Task.FromResult(0);
        }

        public Task ChallengeAsync(HttpAuthenticationChallengeContext context, CancellationToken cancellationToken)
        {
            context.Result = new ResultWithChallenge(context.Result, domain);
            return Task.FromResult(0);
        }
    }
}
