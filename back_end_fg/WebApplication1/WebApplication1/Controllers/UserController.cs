﻿using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using WimsApiMKI.Models;

namespace WebApplication1.Controllers
{
    public class UserController : ApiController
    {
        List<WimsUser> listFromDB = new List<WimsUser>();

        public IEnumerable<WimsUser> Get()
        {
            using (SqlConnection c = new SqlConnection())
            {
                c.ConnectionString = @"Data Source=TFNSSC07\SQLEXPRESS;Initial Catalog=WIMS_Database;Integrated Security=True;";
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
                            user.Firstname = (string)reader[1].ToString().Trim();
                            user.Lastname = (string)reader[2].ToString().Trim();
                            user.Pseudo = (string)reader[3].ToString().Trim();
                            user.Pswd = (string)reader[4].ToString().Trim();
                            user.Email = (string)reader[5].ToString().Trim();
                            user.TwitchLink = (reader[6] is DBNull) ? null : (string)reader[6];
                            user.PseudoTwitch = (reader[7] is DBNull) ? null : (string)reader[7];
                            user.ConditionAccepted = (bool)reader[8];
                            user.CurrencyId = (reader[9] is DBNull) ? null : (int?)reader[9];
                            user.Avatar = (reader[10] is DBNull) ? null : (string)reader[10];
                            user.Active = (bool)reader[11];
                            user.Role.Id = (int)reader[12];
                            listFromDB.Add(user);
                        }
                    }
                    c.Close();
                }
            }

            return listFromDB;
        }

        public WimsUser Get(int id)
        {
            WimsUser user = new WimsUser();

            using (SqlConnection c = new SqlConnection())
            {
                c.ConnectionString = @"Data Source=TFNSSC07\SQLEXPRESS;Initial Catalog=WIMS_Database;Integrated Security=True;";
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
                        user.Firstname = (string)reader[1].ToString().Trim();
                        user.Lastname = (string)reader[2].ToString().Trim();
                        user.Pseudo = (string)reader[3].ToString().Trim();
                        user.Pswd = (string)reader[4].ToString().Trim();
                        user.Email = (string)reader[5].ToString().Trim();
                        user.TwitchLink = (reader[6] is DBNull) ? null : (string)reader[6];
                        user.PseudoTwitch = (reader[7] is DBNull) ? null : (string)reader[7];
                        user.ConditionAccepted = (bool)reader[8];
                        user.CurrencyId = (reader[9] is DBNull) ? null : (int?)reader[9];
                        if (user.CurrencyId != null) { user.Currency.Id = (int)user.CurrencyId; }
                        user.Avatar = (reader[10] is DBNull) ? null : (string)reader[10];
                        user.Active = (bool)reader[11];
                        user.Role.Id = (int)reader[12];
                    }
                }
                c.Close();
            }
            return user;
        }

        public void Post([FromBody]WimsUser u)
        {
            using (SqlConnection c = new SqlConnection())
            {
                c.ConnectionString = @"Data Source=TFNSSC07\SQLEXPRESS;Initial Catalog=WIMS_Database;Integrated Security=True;";
                SqlCommand cmd = new SqlCommand("AddWimsUser", c);
                cmd.CommandType = CommandType.StoredProcedure;

                #region paramètres add user avec objet posté

                cmd.Parameters.Add("@FirstName", SqlDbType.Text);
                cmd.Parameters["@FirstName"].Value = (string)u.Firstname;
                
                cmd.Parameters.Add("@LastName", SqlDbType.Text);
                cmd.Parameters["@LastName"].Value = (string)u.Lastname;

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

                cmd.Parameters.Add("@Role", SqlDbType.Int);
                cmd.Parameters["@Role"].Value = (int)u.Role.Id;

                #endregion

                c.Open();
                int rowsAffected = cmd.ExecuteNonQuery();
                c.Close();
            }

            listFromDB.Add(u);
        }

        public void Put(int id, [FromBody]WimsUser u)
        {
            WimsUser userToModify = this.Get(id);
            int index = listFromDB.FindIndex(x => x.Id == userToModify.Id);

            listFromDB.Remove(userToModify);

            using (SqlConnection c = new SqlConnection())
            {
                c.ConnectionString = @"Data Source=TFNSSC07\SQLEXPRESS;Initial Catalog=WIMS_Database;Integrated Security=True;";
                SqlCommand cmd = new SqlCommand("UpdateWimsUser", c);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.Add("@Id", SqlDbType.Int);
                cmd.Parameters["@Id"].Value = id;
                u.Id = id;

                cmd.Parameters.Add("@FirstName", SqlDbType.Text);
                cmd.Parameters["@FirstName"].Value = (string)u.Firstname;

                cmd.Parameters.Add("@LastName", SqlDbType.Text);
                cmd.Parameters["@LastName"].Value = (string)u.Lastname;

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

                cmd.Parameters.Add("@Role", SqlDbType.Int);
                cmd.Parameters["@Role"].Value = (int)u.Role.Id;

                c.Open();
                int rowsAffected = cmd.ExecuteNonQuery();
                c.Close();
            }

            listFromDB.Add(u);
        }

        public void Delete(int id)
        {
            using (SqlConnection c = new SqlConnection())
            {
                c.ConnectionString = @"Data Source=TFNSSC07\SQLEXPRESS;Initial Catalog=WIMS_Database;Integrated Security=True;";
                SqlCommand cmd = new SqlCommand("DELETE FROM WimsUser WHERE Id = @id", c);
                cmd.Parameters.Add("@id", SqlDbType.Int);
                cmd.Parameters["@id"].Value = id;
                c.Open();
                int rowsAffected = cmd.ExecuteNonQuery();
                c.Close();
            }
        }
    }
}