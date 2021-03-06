﻿using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;
using WebApplication1.Authenticators;
using WebApplication1.Models;
using WebApplication1.Repositories;
using WimsApiMKI.Models;

namespace WebApplication1.Controllers
{
    [EnableCors("*", "*", "*")]
    //[Authorize(Roles = "Admin")]
    public class UserController : ApiController
    {
        UserRepository repo = new UserRepository();

        //[AllowAnonymous]
        [TokenAuthenticator(Domain: "userDom")]
        [Authorize(Roles = "Streamer")]
        public IEnumerable<WimsUser> Get()
        {
            return this.repo.getAll();

            #region copied in repository
            //using (SqlConnection c = new SqlConnection())
            //{
            //    c.ConnectionString = ConfigurationManager.ConnectionStrings[ConnectionStringID].ConnectionString;
            //    //c.ConnectionString = @"Data Source=TFNSSC07\SQLEXPRESS;Initial Catalog=WIMS_Database;Integrated Security=True;";
            //    using (SqlCommand cmd = c.CreateCommand())
            //    {
            //        cmd.CommandText = "SelectWimsUser";
            //        cmd.CommandType = CommandType.StoredProcedure;
            //        c.Open();
            //        using (SqlDataReader reader = cmd.ExecuteReader())
            //        {
            //            while (reader.Read())
            //            {
            //                WimsUser user = new WimsUser();
            //                user.Id = (int)reader[0];
            //                user.Firstname = (string)reader[1].ToString().Trim();
            //                user.Lastname = (string)reader[2].ToString().Trim();
            //                user.Pseudo = (string)reader[3].ToString().Trim();
            //                user.Pswd = (string)reader[4].ToString().Trim();
            //                user.Email = (string)reader[5].ToString().Trim();
            //                user.TwitchLink = (reader[6] is DBNull) ? null : (string)reader[6];
            //                user.PseudoTwitch = (reader[7] is DBNull) ? null : (string)reader[7];
            //                user.ConditionAccepted = (bool)reader[8];
            //                user.CurrencyId = (reader[9] is DBNull) ? null : (int?)reader[9];
            //                user.Avatar = (reader[10] is DBNull) ? null : (string)reader[10];
            //                user.Active = (bool)reader[11];
            //                //user.Role.Id = (int)reader[12];
            //                user.Role = (int)reader[12];
            //                listFromDB.Add(user);
            //            }
            //        }
            //        c.Close();
            //    }
            //}

            //return listFromDB;
            #endregion
        }

        [HttpGet]
        [Route("api/user/balance/{id}")]
        public int GetBalance(int id)
        {
            return this.repo.getBalance(id);
        }

        [TokenAuthenticator(Domain: "userDom")]
        [Authorize(Roles = "Admin, Viewer, Streamer")]
        [HttpGet]
        [Route("api/user/{id}")]
        public WimsUser Get(int id)
        {
            return this.repo.getById(id);

            #region copied in repository
            //    WimsUser user = new WimsUser();

            //    using (SqlConnection c = new SqlConnection())
            //    {
            //        c.ConnectionString = ConfigurationManager.ConnectionStrings[ConnectionStringID].ConnectionString;
            //        //c.ConnectionString = @"Data Source=TFNSSC07\SQLEXPRESS;Initial Catalog=WIMS_Database;Integrated Security=True;";
            //        SqlCommand cmd = new SqlCommand("SelectWimsUserById", c);
            //        cmd.CommandType = CommandType.StoredProcedure;
            //        cmd.Parameters.Add("@Id", SqlDbType.Int);
            //        cmd.Parameters["@Id"].Value = id;

            //        c.Open();
            //        using (SqlDataReader reader = cmd.ExecuteReader())
            //        {
            //            while (reader.Read())
            //            {
            //                user.Id = (int)reader[0];
            //                user.Firstname = (string)reader[1].ToString().Trim();
            //                user.Lastname = (string)reader[2].ToString().Trim();
            //                user.Pseudo = (string)reader[3].ToString().Trim();
            //                user.Pswd = (string)reader[4].ToString().Trim();
            //                user.Email = (string)reader[5].ToString().Trim();
            //                user.TwitchLink = (reader[6] is DBNull) ? null : (string)reader[6];
            //                user.PseudoTwitch = (reader[7] is DBNull) ? null : (string)reader[7];
            //                user.ConditionAccepted = (bool)reader[8];
            //                user.CurrencyId = (reader[9] is DBNull) ? null : (int?)reader[9];
            //                if (user.CurrencyId != null) { user.Currency.Id = (int)user.CurrencyId; }
            //                user.Avatar = (reader[10] is DBNull) ? null : (string)reader[10];
            //                user.Active = (bool)reader[11];
            //                //user.Role.Id = (int)reader[12];
            //                user.Role = (int)reader[12];
            //            }
            //        }
            //        c.Close();
            //    }
            //    return user;
            #endregion
        }
        
        public WimsUser GetWithLogin(string login)
        {
            return this.repo.getByLogin(login);
        }

        [HttpPost]
        [Route("api/user/usercheck")]
        public bool CheckIfExists([FromBody]UserCheckModel u)
        {
            return this.repo.checkExisting(u);
        }

        [Route("api/user/token")]
        [HttpPost]
        public string BuildToken([FromBody]TokenModel t)
        {
            return this.repo.createToken(t);
        }

        //only not authenticated users, manage this on the front app
        [TokenAuthenticator(Domain: "userDom")]
        [Authorize(Roles = "Admin, visitor")]
        [HttpPost]
        public void Post([FromBody]WimsUser u)
        {
            this.repo.add(u);

            #region copied in repository
            //    using (SqlConnection c = new SqlConnection())
            //    {
            //        c.ConnectionString = ConfigurationManager.ConnectionStrings[ConnectionStringID].ConnectionString;
            //        //c.ConnectionString = @"Data Source=TFNSSC07\SQLEXPRESS;Initial Catalog=WIMS_Database;Integrated Security=True;";
            //        SqlCommand cmd = new SqlCommand("AddWimsUser", c);
            //        cmd.CommandType = CommandType.StoredProcedure;

            //        #region paramètres add user avec objet posté

            //        cmd.Parameters.Add("@FirstName", SqlDbType.Text);
            //        cmd.Parameters["@FirstName"].Value = (string)u.Firstname;

            //        cmd.Parameters.Add("@LastName", SqlDbType.Text);
            //        cmd.Parameters["@LastName"].Value = (string)u.Lastname;

            //        cmd.Parameters.Add("@Pseudo", SqlDbType.Text);
            //        cmd.Parameters["@Pseudo"].Value = (string)u.Pseudo;

            //        cmd.Parameters.Add("@Pswd", SqlDbType.Text);
            //        cmd.Parameters["@Pswd"].Value = (string)u.Pswd;

            //        cmd.Parameters.Add("@Email", SqlDbType.Text);
            //        cmd.Parameters["@Email"].Value = (string)u.Email;

            //        cmd.Parameters.Add("@TwitchLink", SqlDbType.Text);
            //        cmd.Parameters["@TwitchLink"].Value = (string)u.TwitchLink;

            //        cmd.Parameters.Add("@PseudoTwitch", SqlDbType.Text);
            //        cmd.Parameters["@PseudoTwitch"].Value = (string)u.PseudoTwitch;

            //        cmd.Parameters.Add("@ConditionAccepted", SqlDbType.Bit);
            //        cmd.Parameters["@ConditionAccepted"].Value = (bool)u.ConditionAccepted;

                //cmd.Parameters.Add("@Role", SqlDbType.Int);
                //cmd.Parameters["@Role"].Value = (int)u.Role.Id;
                //cmd.Parameters["@Role"].Value = (int)u.Role;

            //        cmd.Parameters.Add("@CurrencyId", SqlDbType.Int);
            //        cmd.Parameters["@CurrencyId"].Value = (int)u.Currency.Id;

            //        cmd.Parameters.Add("@Avatar", SqlDbType.Text);
            //        cmd.Parameters["@Avatar"].Value = (string)u.Avatar;

            //        cmd.Parameters.Add("@Active", SqlDbType.Bit);
            //        u.Active = true;
            //        cmd.Parameters["@Active"].Value = (bool)u.Active;

            //        cmd.Parameters.Add("@Role", SqlDbType.Int);
            //        //cmd.Parameters["@Role"].Value = (int)u.Role.Id;
            //        cmd.Parameters["@Role"].Value = (int)u.Role;

            //        #endregion

            //        c.Open();
            //        int rowsAffected = cmd.ExecuteNonQuery();
            //        c.Close();
            //    }

            //    listFromDB.Add(u);
            #endregion
        }

        [TokenAuthenticator(Domain: "userDom")]
        [Authorize(Roles = "Admin, Viewer, Streamer")]
        [HttpPut]
        [Route("api/user/{id}")]
        public void Put(int id, [FromBody]WimsUser u)
        {
            this.repo.update(id, u);

            #region copied in repository
            //    WimsUser userToModify = this.Get(id);
            //    int index = listFromDB.FindIndex(x => x.Id == userToModify.Id);

            //    listFromDB.Remove(userToModify);

            //    using (SqlConnection c = new SqlConnection())
            //    {
            //        c.ConnectionString = ConfigurationManager.ConnectionStrings[ConnectionStringID].ConnectionString;
            //        //c.ConnectionString = @"Data Source=TFNSSC07\SQLEXPRESS;Initial Catalog=WIMS_Database;Integrated Security=True;";
            //        SqlCommand cmd = new SqlCommand("UpdateWimsUser", c);
            //        cmd.CommandType = CommandType.StoredProcedure;
            //        cmd.Parameters.Add("@Id", SqlDbType.Int);
            //        cmd.Parameters["@Id"].Value = id;
            //        u.Id = id;

            //        cmd.Parameters.Add("@FirstName", SqlDbType.Text);
            //        cmd.Parameters["@FirstName"].Value = (string)u.Firstname;

            //        cmd.Parameters.Add("@LastName", SqlDbType.Text);
            //        cmd.Parameters["@LastName"].Value = (string)u.Lastname;

            //        cmd.Parameters.Add("@Pseudo", SqlDbType.Text);
            //        cmd.Parameters["@Pseudo"].Value = (string)u.Pseudo;

            //        cmd.Parameters.Add("@Pswd", SqlDbType.Text);
            //        cmd.Parameters["@Pswd"].Value = (string)u.Pswd;

            //        cmd.Parameters.Add("@Email", SqlDbType.Text);
            //        cmd.Parameters["@Email"].Value = (string)u.Email;

            //        cmd.Parameters.Add("@TwitchLink", SqlDbType.Text);
            //        cmd.Parameters["@TwitchLink"].Value = (string)u.TwitchLink;

            //        cmd.Parameters.Add("@PseudoTwitch", SqlDbType.Text);
            //        cmd.Parameters["@PseudoTwitch"].Value = (string)u.PseudoTwitch;

            //        cmd.Parameters.Add("@ConditionAccepted", SqlDbType.Bit);
            //        cmd.Parameters["@ConditionAccepted"].Value = (bool)u.ConditionAccepted;

            //        cmd.Parameters.Add("@CurrencyId", SqlDbType.Int);
            //        cmd.Parameters["@CurrencyId"].Value = (int)u.Currency.Id;

            //        cmd.Parameters.Add("@Avatar", SqlDbType.Text);
            //        cmd.Parameters["@Avatar"].Value = (string)u.Avatar;

            //        cmd.Parameters.Add("@Active", SqlDbType.Bit);
            //        u.Active = true;
            //        cmd.Parameters["@Active"].Value = (bool)u.Active;

            //        cmd.Parameters.Add("@Role", SqlDbType.Int);
            //        //cmd.Parameters["@Role"].Value = (int)u.Role.Id;
            //        cmd.Parameters["@Role"].Value = (int)u.Role;

            //        c.Open();
            //        int rowsAffected = cmd.ExecuteNonQuery();
            //        c.Close();
            //    }

            //    listFromDB.Add(u);
            #endregion
        }
        
        [TokenAuthenticator(Domain: "userDom")]
        [Authorize(Roles = "Admin")]
        public void Delete(int id)
        {
            this.repo.delete(id, "WimsUser");

            #region copied in repository
            //    using (SqlConnection c = new SqlConnection())
            //    {
            //        c.ConnectionString = ConfigurationManager.ConnectionStrings[ConnectionStringID].ConnectionString;
            //        //c.ConnectionString = @"Data Source=TFNSSC07\SQLEXPRESS;Initial Catalog=WIMS_Database;Integrated Security=True;";
            //        SqlCommand cmd = new SqlCommand("DELETE FROM WimsUser WHERE Id = @id", c);
            //        cmd.Parameters.Add("@id", SqlDbType.Int);
            //        cmd.Parameters["@id"].Value = id;
            //        c.Open();
            //        int rowsAffected = cmd.ExecuteNonQuery();
            //        c.Close();
            //    }
            #endregion
        }
    }
    }
