using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using System.Web;
using System.Web.Http;
using Microsoft.IdentityModel.Tokens;
using WebApplication1.Models;
using WimsApiMKI.Models;

namespace WebApplication1.Repositories
{
    public class UserRepository : BaseRepository
    {
        List<WimsUser> listFromDB = new List<WimsUser>();
        static string ServerName = System.Net.Dns.GetHostName();
        static string ConnectionStringID =
                (ServerName == "TFNSSC07") ? "LocalConnection" : "DefaultConnection";

        CurrencyRepository cRepo = new CurrencyRepository();

        public IEnumerable<WimsUser> getAll()
        {
            using (SqlConnection c = new SqlConnection())
            {
                c.ConnectionString = ConfigurationManager.ConnectionStrings[ConnectionStringID].ConnectionString;
                //c.ConnectionString = @"Data Source=TFNSSC07\SQLEXPRESS;Initial Catalog=WIMS_Database;Integrated Security=True;";
                using (SqlCommand cmd = c.CreateCommand())
                {
                    cmd.CommandText = "SelectWimsUser";
                    cmd.CommandType = CommandType.StoredProcedure;
                    c.Open();
                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        while (reader.Read())
                        {
                            WimsUser user = new WimsUser();
                            user.Id = (int)reader[0];
                            user.FirstName = (string)reader[1].ToString().Trim();
                            user.LastName = (string)reader[2].ToString().Trim();
                            user.Pseudo = (string)reader[3].ToString().Trim();
                            user.Pswd = (string)reader[4].ToString().Trim();
                            user.Email = (string)reader[5].ToString().Trim();
                            user.TwitchLink = (reader[6] is DBNull) ? null : (string)reader[6];
                            user.PseudoTwitch = (reader[7] is DBNull) ? null : (string)reader[7];
                            user.Balance = (int)reader[8];
                            user.ConditionAccepted = (bool)reader[9];
                            user.CurrencyId = (reader[10] is DBNull) ? null : (int?)reader[10];
                            if (user.CurrencyId != null)
                            {
                                user.Currency = cRepo.getById((int)user.CurrencyId);
                            }
                            //if (user.CurrencyId != null) { user.Currency.Id = (int)user.CurrencyId; }
                            user.Avatar = (reader[11] is DBNull) ? null : (string)reader[11].ToString().Trim();
                            //user.Role.Id = (int)reader[12];
                            user.RoleId = (int)reader[12];
                            user.Active = (bool)reader[13];
                            listFromDB.Add(user);
                        }
                    }
                    c.Close();
                }
            }

            return listFromDB;
        }

        public WimsUser getById(int id)
        {
            WimsUser user = new WimsUser();

            using (SqlConnection c = new SqlConnection())
            {
                c.ConnectionString = ConfigurationManager.ConnectionStrings[ConnectionStringID].ConnectionString;
                //c.ConnectionString = @"Data Source=TFNSSC07\SQLEXPRESS;Initial Catalog=WIMS_Database;Integrated Security=True;";
                SqlCommand cmd = new SqlCommand("SelectWimsUserById", c);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.Add("@Id", SqlDbType.Int);
                cmd.Parameters["@Id"].Value = id;

                c.Open();
                using (SqlDataReader reader = cmd.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        user.Id = (int)reader[0];
                        user.FirstName = (string)reader[1].ToString().Trim();
                        user.LastName = (string)reader[2].ToString().Trim();
                        user.Pseudo = (string)reader[3].ToString().Trim();
                        user.Pswd = (string)reader[4].ToString().Trim();
                        user.Email = (string)reader[5].ToString().Trim();
                        user.TwitchLink = (reader[6] is DBNull) ? null : (string)reader[6];
                        user.PseudoTwitch = (reader[7] is DBNull) ? null : (string)reader[7];
                        user.Balance = (int)reader[8];
                        user.ConditionAccepted = (bool)reader[9];
                        user.CurrencyId = (reader[10] is DBNull) ? null : (int?)reader[10];
                        if (user.CurrencyId != null)
                        {
                            user.Currency = cRepo.getById((int)user.CurrencyId);
                        }
                        //if (user.CurrencyId != null) { user.Currency.Id = (int)user.CurrencyId; }
                        user.Avatar = (reader[11] is DBNull) ? null : (string)reader[11].ToString().Trim();
                        //user.Role.Id = (int)reader[12];
                        user.RoleId = (int)reader[12];
                        user.Active = (bool)reader[13];
                    }
                }
                c.Close();
            }
            return user;
        }

        public int getBalance(int id)
        {
            int balanceToReturn = new int();

            using (SqlConnection c = new SqlConnection())
            {
                c.ConnectionString = ConfigurationManager.ConnectionStrings[ConnectionStringID].ConnectionString;
                SqlCommand cmd = new SqlCommand("Select Balance FROM WimsUser WHERE Id = " + id, c);

                c.Open();
                balanceToReturn = (int)cmd.ExecuteScalar();
                c.Close();
            }

            return balanceToReturn;
        }

        public bool checkExisting(WimsUser u)
        {
            using (SqlConnection c = new SqlConnection())
            {
                c.ConnectionString = ConfigurationManager.ConnectionStrings[ConnectionStringID].ConnectionString;

                using (SqlCommand cmd = c.CreateCommand())
                {
                    cmd.CommandText = "SelectWimsUser";
                    cmd.CommandType = CommandType.StoredProcedure;
                    c.Open();
                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        while (reader.Read())
                        {
                            WimsUser user = new WimsUser();
                            user.Id = (int)reader[0];
                            user.FirstName = (string)reader[1].ToString().Trim();
                            user.LastName = (string)reader[2].ToString().Trim();
                            user.Pseudo = (string)reader[3].ToString().Trim();
                            user.Pswd = (string)reader[4].ToString().Trim();
                            user.Email = (string)reader[5].ToString().Trim();
                            user.TwitchLink = (reader[6] is DBNull) ? null : (string)reader[6];
                            user.PseudoTwitch = (reader[7] is DBNull) ? null : (string)reader[7];
                            user.Balance = (int)reader[8];
                            user.ConditionAccepted = (bool)reader[9];
                            user.CurrencyId = (reader[10] is DBNull) ? null : (int?)reader[10];
                            if (user.CurrencyId != null)
                            {
                                user.Currency = cRepo.getById((int)user.CurrencyId);
                            }
                            user.Avatar = (reader[11] is DBNull) ? null : (string)reader[11].ToString().Trim();
                            user.RoleId = (int)reader[12];
                            user.Active = (bool)reader[13];
                            listFromDB.Add(user);
                        }
                    }
                    c.Close();
                }
            }

            foreach(WimsUser w in listFromDB)
            {
                if(w.Pseudo == u.Pseudo || w.Email == u.Email)
                {
                    return true;
                }
            }

            return false;
        }

        public string createToken(TokenModel t)
        {
            string key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9";
            
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(key));
            
            var credentials = new SigningCredentials
                              (securityKey, SecurityAlgorithms.HmacSha256Signature);
            
            var header = new JwtHeader(credentials);

            var payload = new JwtPayload();

            using (SqlConnection c = new SqlConnection())
            {
                c.ConnectionString = ConfigurationManager.ConnectionStrings[ConnectionStringID].ConnectionString;
                using (SqlCommand cmd = c.CreateCommand())
                {
                    cmd.CommandText = "SELECT * From WimsUser Where Pseudo = @pseudo AND Pswd = @pswd";

                    cmd.Parameters.AddWithValue("@pseudo", t.Pseudo);
                    cmd.Parameters.AddWithValue("@pswd", t.Pswd);

                    c.Open();
                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        while (reader.Read())
                        {
                            payload.Add("Id", (int)reader[0]);
                            //payload.Add("Firstname", (string)reader[1].ToString().Trim());
                            //payload.Add("Lastname", (string)reader[2].ToString().Trim());
                            payload.Add("Pseudo", (string)reader[3].ToString().Trim());
                            payload.Add("Password", (string)reader[4].ToString().Trim());
                            //payload.Add("Email", (string)reader[5].ToString().Trim());
                            //payload.Add("TwitchLink", (reader[6] is DBNull) ? null : (string)reader[6]);
                            //payload.Add("PseudoTwitch", (reader[7] is DBNull) ? null : (string)reader[7]);
                            //payload.Add("Balance", (int)reader[8]);
                            //payload.Add("ConditionAccepted", (bool)reader[9]);
                            //payload.Add("CurrencyId", (reader[10] is DBNull) ? null : (int?)reader[10]);
                            //payload.Add("Avatar", (reader[11] is DBNull) ? null : (string)reader[11].ToString().Trim());
                            payload.Add("RoleId", (int)reader[12]);
                            //payload.Add("Active", (bool)reader[13]);
                        }
                    }
                    c.Close();
                }

                var secToken = new JwtSecurityToken(header, payload);
                var handler = new JwtSecurityTokenHandler();

                var tokenString = handler.WriteToken(secToken);
                //var token = handler.ReadJwtToken(tokenString);

                if (payload.Keys.Count > 0)
                {
                    return tokenString;
                }
                else
                {
                    return "invalid dude";
                }
            }
        }

        public void add(WimsUser u)
        {
            using (SqlConnection c = new SqlConnection())
            {
                c.ConnectionString = ConfigurationManager.ConnectionStrings[ConnectionStringID].ConnectionString;
                //c.ConnectionString = @"Data Source=TFNSSC07\SQLEXPRESS;Initial Catalog=WIMS_Database;Integrated Security=True;";
                SqlCommand cmd = new SqlCommand("AddWimsUser", c);
                cmd.CommandType = CommandType.StoredProcedure;

                #region paramètres add user avec objet posté

                cmd.Parameters.Add("@FirstName", SqlDbType.Text);
                cmd.Parameters["@FirstName"].Value = (string)u.FirstName;

                cmd.Parameters.Add("@LastName", SqlDbType.Text);
                cmd.Parameters["@LastName"].Value = (string)u.LastName;

                cmd.Parameters.Add("@Pseudo", SqlDbType.Text);
                cmd.Parameters["@Pseudo"].Value = (string)u.Pseudo;

                cmd.Parameters.Add("@Pswd", SqlDbType.Text);
                cmd.Parameters["@Pswd"].Value = (string)u.Pswd;

                cmd.Parameters.Add("@Email", SqlDbType.Text);
                cmd.Parameters["@Email"].Value = (string)u.Email;

                cmd.Parameters.Add("@TwitchLink", SqlDbType.Text);
                cmd.Parameters["@TwitchLink"].Value = (string)u.TwitchLink;

                cmd.Parameters.Add("@PseudoTwitch", SqlDbType.Text);
                cmd.Parameters["@PseudoTwitch"].Value = (string)u.PseudoTwitch;

                cmd.Parameters.Add("@ConditionAccepted", SqlDbType.Bit);
                cmd.Parameters["@ConditionAccepted"].Value = (bool)u.ConditionAccepted;

                cmd.Parameters.Add("@CurrencyId", SqlDbType.Int);
                cmd.Parameters["@CurrencyId"].Value = (int)u.Currency.Id;

                cmd.Parameters.Add("@Avatar", SqlDbType.Text);
                cmd.Parameters["@Avatar"].Value = (string)u.Avatar;

                cmd.Parameters.Add("@Active", SqlDbType.Bit);
                u.Active = true;
                cmd.Parameters["@Active"].Value = (bool)u.Active;

                cmd.Parameters.AddWithValue("@Role", (int)u.RoleId);
                //cmd.Parameters["@Role"].Value = (int)u.Role.Id;

                #endregion

                c.Open();
                int rowsAffected = cmd.ExecuteNonQuery();
                c.Close();
            }

            listFromDB.Add(u);
        }

        public void update(int id, WimsUser u)
        {
            WimsUser userToModify = this.getById(id);
            int index = listFromDB.FindIndex(x => x.Id == userToModify.Id);

            listFromDB.Remove(userToModify);

            using (SqlConnection c = new SqlConnection())
            {
                c.ConnectionString = ConfigurationManager.ConnectionStrings[ConnectionStringID].ConnectionString;
                //c.ConnectionString = @"Data Source=TFNSSC07\SQLEXPRESS;Initial Catalog=WIMS_Database;Integrated Security=True;";
                SqlCommand cmd = new SqlCommand("UpdateWimsUser", c);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.Add("@Id", SqlDbType.Int);
                cmd.Parameters["@Id"].Value = id;
                u.Id = id;

                cmd.Parameters.Add("@FirstName", SqlDbType.Text);
                cmd.Parameters["@FirstName"].Value = (u.FirstName is null) ? userToModify.FirstName : (string)u.FirstName;

                cmd.Parameters.Add("@LastName", SqlDbType.Text);
                cmd.Parameters["@LastName"].Value = (u.LastName is null) ? userToModify.LastName : (string)u.LastName;

                cmd.Parameters.Add("@Pseudo", SqlDbType.Text);
                cmd.Parameters["@Pseudo"].Value = (u.Pseudo is null) ? userToModify.Pseudo : (string)u.Pseudo;

                cmd.Parameters.Add("@Pswd", SqlDbType.Text);
                cmd.Parameters["@Pswd"].Value = (u.Pswd is null) ? userToModify.Pswd : (string)u.Pswd;

                cmd.Parameters.Add("@Email", SqlDbType.Text);
                cmd.Parameters["@Email"].Value = (u.Email is null) ? userToModify.Email : (string)u.Email;

                cmd.Parameters.Add("@TwitchLink", SqlDbType.Text);
                cmd.Parameters["@TwitchLink"].Value = (u.TwitchLink is null) ? userToModify.TwitchLink : (string)u.TwitchLink;

                cmd.Parameters.Add("@PseudoTwitch", SqlDbType.Text);
                cmd.Parameters["@PseudoTwitch"].Value = (u.PseudoTwitch is null) ? userToModify.PseudoTwitch : (string)u.PseudoTwitch;

                cmd.Parameters.Add("@Balance", SqlDbType.Int);
                cmd.Parameters["@Balance"].Value = (u.Balance > 0) ? (int)u.Balance : userToModify.Balance ;

                cmd.Parameters.Add("@ConditionAccepted", SqlDbType.Bit);
                cmd.Parameters["@ConditionAccepted"].Value = (bool)u.ConditionAccepted;

                cmd.Parameters.Add("@CurrencyId", SqlDbType.Int);
                cmd.Parameters["@CurrencyId"].Value = (u.CurrencyId is null) ? userToModify.CurrencyId : (int)u.Currency.Id;

                cmd.Parameters.Add("@Avatar", SqlDbType.Text);
                cmd.Parameters["@Avatar"].Value = (u.Avatar is null) ? userToModify.Avatar : (string)u.Avatar;

                cmd.Parameters.Add("@Active", SqlDbType.Bit);
                cmd.Parameters["@Active"].Value = (u.Active == true) ? true : (bool)u.Active;

                cmd.Parameters.Add("@Role", SqlDbType.Int);
                //cmd.Parameters["@Role"].Value = (int)u.Role.Id;
                cmd.Parameters["@Role"].Value = (u.RoleId == 0) ? userToModify.RoleId : (int)u.RoleId;

                c.Open();
                int rowsAffected = cmd.ExecuteNonQuery();
                c.Close();
            }

            listFromDB.Add(u);
        }

        public WimsUser getByLogin(string login)
        {
            WimsUser user = new WimsUser();

            using (SqlConnection c = new SqlConnection())
            {
                c.ConnectionString = ConfigurationManager.ConnectionStrings[ConnectionStringID].ConnectionString;
                //c.ConnectionString = @"Data Source=TFNSSC07\SQLEXPRESS;Initial Catalog=WIMS_Database;Integrated Security=True;";
                SqlCommand cmd = new SqlCommand("Select * FROM WimsUser WHERE Pseudo = @Pseudo", c);
                cmd.Parameters.Add("@Pseudo", SqlDbType.NChar);
                cmd.Parameters["@Pseudo"].Value = login;

                c.Open();
                using (SqlDataReader reader = cmd.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        user.Id = (int)reader[0];
                        user.FirstName = (string)reader[1].ToString().Trim();
                        user.LastName = (string)reader[2].ToString().Trim();
                        user.Pseudo = (string)reader[3].ToString().Trim();
                        user.Pswd = (string)reader[4].ToString().Trim();
                        user.Email = (string)reader[5].ToString().Trim();
                        user.TwitchLink = (reader[6] is DBNull) ? null : (string)reader[6];
                        user.PseudoTwitch = (reader[7] is DBNull) ? null : (string)reader[7];
                        user.Balance = (int)reader[8];
                        user.ConditionAccepted = (bool)reader[9];
                        user.CurrencyId = (reader[10] is DBNull) ? null : (int?)reader[10];
                        if (user.CurrencyId != null)
                        {
                            user.Currency = cRepo.getById((int)user.CurrencyId);
                        }
                        //if (user.CurrencyId != null) { user.Currency.Id = (int)user.CurrencyId; }
                        user.Avatar = (reader[11] is DBNull) ? null : (string)reader[11].ToString().Trim();
                        //user.Role.Id = (int)reader[12];
                        user.RoleId = (int)reader[12];
                        user.Active = (bool)reader[13];
                    }
                }
                c.Close();
            }
            return user;
        }
    }
}
