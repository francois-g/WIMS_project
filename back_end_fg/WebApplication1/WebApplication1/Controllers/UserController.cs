using System;
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
                            user.Firstname = (string)reader[1];
                            user.Lastname = (string)reader[2];
                            user.Pseudo = (string)reader[3];
                            user.Pswd = (string)reader[4];
                            user.Email = (string)reader[5];
                            user.TwitchLink = (string)reader[6];
                            user.PseudoTwitch = (string)reader[7];
                            user.ConditionAccepted = (bool)reader[8];
                            user.Currency.Id = (int)reader[9];
                            user.Avatar = (string)reader[10];
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
                        user.Firstname = (string)reader[1];
                        user.Lastname = (string)reader[2];
                        user.Pseudo = (string)reader[3];
                        user.Pswd = (string)reader[4];
                        user.Email = (string)reader[5];
                        user.TwitchLink = (string)reader[6];
                        user.PseudoTwitch = (string)reader[7];
                        user.ConditionAccepted = (bool)reader[8];
                        user.Currency.Id = (int)reader[9];
                        user.Avatar = (string)reader[10];
                        user.Active = (bool)reader[11];
                        user.Role.Id = (int)reader[12];
                    }
                }
                c.Close();
            }
            return user;
        }

        //public void Post([FromBody]WimsUser p)
        //{
        //    using (SqlConnection c = new SqlConnection())
        //    {
        //        c.ConnectionString = @"Data Source=TFNSSC07\SQLEXPRESS;Initial Catalog=WIMS_Database;Integrated Security=True;";
        //        SqlCommand cmd = new SqlCommand("AddWimsUser", c);
        //        cmd.CommandType = CommandType.StoredProcedure;


        //        cmd.Parameters.Add("@TwitcherId", SqlDbType.Int);
        //        cmd.Parameters["@TwitcherId"].Value = (int)p.Twitcher.Id;

        //        Auction StartAuction = new Auction(p.AuctionStartValue);
        //        SqlCommand insertFalseAuction = new SqlCommand("INSERT INTO Auction (CurrentAuction, TwitcherId, UserId) VALUES (" + p.AuctionStartValue + ", " + p.Twitcher.Id + ", " + p.Twitcher.Id + ")", c);
        //        c.Open();
        //        int applyInsert = insertFalseAuction.ExecuteNonQuery();
        //        c.Close();

        //        SqlCommand getIdFalseAuction = new SqlCommand("Select MAX(Id) FROM Auction WHERE UserId = " + p.Twitcher.Id, c);
        //        c.Open();
        //        int idJustInserted = (int)getIdFalseAuction.ExecuteScalar();
        //        c.Close();

        //        cmd.Parameters.Add("@CurrentBestAuction", SqlDbType.Int);
        //        cmd.Parameters["@CurrentBestAuction"].Value = idJustInserted;

        //        cmd.Parameters.Add("@OfferEnd", SqlDbType.DateTime);
        //        cmd.Parameters["@OfferEnd"].Value = (DateTime)p.OfferEnd;

        //        cmd.Parameters.Add("@GameId", SqlDbType.Int);
        //        cmd.Parameters["@GameId"].Value = (int)p.Game.Id;

        //        cmd.Parameters.Add("@AuctionStartValue", SqlDbType.Int);
        //        cmd.Parameters["@AuctionStartValue"].Value = (int)p.AuctionStartValue;

        //        cmd.Parameters.Add("@Active", SqlDbType.Bit);
        //        p.Active = true;
        //        cmd.Parameters["@Active"].Value = (bool)p.Active;

        //        c.Open();
        //        int rowsAffected = cmd.ExecuteNonQuery();
        //        c.Close();
        //    }

        //    listFromDB.Add(p);
        //}

        //public void Put(int id, [FromBody]PriceToWin p)
        //{
        //    PriceToWin priceToModify = this.Get(id);
        //    int index = listFromDB.FindIndex(x => x.Id == priceToModify.Id);

        //    listFromDB.Remove(priceToModify);

        //    using (SqlConnection c = new SqlConnection())
        //    {
        //        c.ConnectionString = @"Data Source=TFNSSC07\SQLEXPRESS;Initial Catalog=WIMS_Database;Integrated Security=True;";
        //        SqlCommand cmd = new SqlCommand("UpdatePriceToWin", c);
        //        cmd.CommandType = CommandType.StoredProcedure;
        //        cmd.Parameters.Add("@Id", SqlDbType.Int);
        //        cmd.Parameters["@Id"].Value = id;

        //        //cmd.Parameters.Add("@TwitcherId", SqlDbType.Int);
        //        //cmd.Parameters["@TwitcherId"].Value = (int)p.Twitcher.Id;

        //        cmd.Parameters.Add("@CurrentBestAuction", SqlDbType.Int);
        //        cmd.Parameters["@CurrentBestAuction"].Value = (int)p.CurrentBestAuction.Id;

        //        //cmd.Parameters.Add("@OfferEnd", SqlDbType.DateTime);
        //        //cmd.Parameters["@OfferEnd"].Value = (DateTime)p.OfferEnd;

        //        //cmd.Parameters.Add("@GameId", SqlDbType.Int);
        //        //cmd.Parameters["@GameId"].Value = (int)p.Game.Id;

        //        //cmd.Parameters.Add("@AuctionStartValue", SqlDbType.Int);
        //        //cmd.Parameters["@AuctionStartValue"].Value = (int)p.AuctionStartValue;

        //        cmd.Parameters.Add("@Active", SqlDbType.Bit);
        //        cmd.Parameters["@Active"].Value = (bool)p.Active;

        //        c.Open();
        //        int rowsAffected = cmd.ExecuteNonQuery();
        //        c.Close();
        //    }

        //    listFromDB.Add(p);
        //}

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
