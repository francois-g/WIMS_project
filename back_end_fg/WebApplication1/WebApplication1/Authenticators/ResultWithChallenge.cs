using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading;
using System.Threading.Tasks;
using System.Web.Http;

namespace WebApplication1.Authenticators
{
    internal class ResultWithChallenge : IHttpActionResult
    {
        private IHttpActionResult result;
        private string domain;

        public ResultWithChallenge(IHttpActionResult Result, string Domain)
        {
            this.result = Result;
            this.domain = Domain;
        }

        public async Task<HttpResponseMessage> ExecuteAsync(CancellationToken cancellationToken)
        {
            var res = await result.ExecuteAsync(cancellationToken);
            if(res.StatusCode == System.Net.HttpStatusCode.Unauthorized)
            {
                res.Headers.WwwAuthenticate.Add(new AuthenticationHeaderValue("Bearer", domain));
            }
            return res;
        }
    }
}
