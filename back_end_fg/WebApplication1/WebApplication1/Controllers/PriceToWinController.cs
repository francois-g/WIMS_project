using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;
using WimsApiMKI.Models;

namespace WebApplication1.Controllers
{
    [EnableCors("*", "*", "*")]
    public class PriceToWinController : ApiController
    {
        List<PriceToWin> listFromDB = new List<PriceToWin>();
        static string ServerName = System.Net.Dns.GetHostName();
        static string ConnectionStringID =
                (ServerName == "TFNSSC07") ? "LocalConnection" : "DefaultConnection";

        public IEnumerable<PriceToWin> Get()
        {
            using (SqlConnection c = new SqlConnection())
            {
                c.ConnectionString = ConfigurationManager.ConnectionStrings[ConnectionStringID].ConnectionString;
                //c.ConnectionString = @"Data Source=TFNSSC07\SQLEXPRESS;Initial Catalog=WIMS_Database;Integrated Security=True;";
                using (SqlCommand cmd = c.CreateCommand())
                {
                    cmd.CommandText = "SelectPriceToWin";
                    cmd.CommandType = CommandType.StoredProcedure;
                    c.Open();
                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        while (reader.Read())
                        {
                            PriceToWin price = new PriceToWin();
                            price.Id = (int)reader[0];
                            price.Twitcher.Id = (int)reader[1];
                            price.IdBestAuction = (reader[2] is DBNull) ? null : (int?)reader[2];
                            //price.CurrentBestAuction = price.CurrentBestAuction;
                            if (price.IdBestAuction != 0) { price.CurrentBestAuction.Id = (int)reader[2]; }
                            price.OfferEnd = (DateTime)reader[3];
                            price.Game.Id = (int)reader[4];
                            price.AuctionStartValue = (int)reader[5];
                            price.Active = (bool)reader[6];
                            listFromDB.Add(price);
                        }
                    }
                    c.Close();
                }
            }

            return listFromDB;
        }

        public PriceToWin Get(int id)
        {
            PriceToWin price = new PriceToWin();

            using (SqlConnection c = new SqlConnection())
            {
                c.ConnectionString = ConfigurationManager.ConnectionStrings[ConnectionStringID].ConnectionString;
                //c.ConnectionString = @"Data Source=TFNSSC07\SQLEXPRESS;Initial Catalog=WIMS_Database;Integrated Security=True;";
                SqlCommand cmd = new SqlCommand("SelectPriceToWinById", c);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.Add("@Id", SqlDbType.Int);
                cmd.Parameters["@Id"].Value = id;

                c.Open();
                using (SqlDataReader reader = cmd.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        price.Id = (int)reader[0];
                        price.Twitcher.Id = (int)reader[1];
                        price.IdBestAuction = (reader[2] is DBNull) ? null : (int?)reader[2];
                        //price.CurrentBestAuction.Id = (int)reader[2];
                        price.OfferEnd = (DateTime)reader[3];
                        price.Game.Id = (int)reader[4];
                        price.AuctionStartValue = (int)reader[5];
                        price.Active = (bool)reader[6];
                    }
                }
                c.Close();
            }
            return price;
        }
        
        public void Post([FromBody]PriceToWin p)
        {
            using (SqlConnection c = new SqlConnection())
            {
                c.ConnectionString = ConfigurationManager.ConnectionStrings[ConnectionStringID].ConnectionString;
                //c.ConnectionString = @"Data Source=TFNSSC07\SQLEXPRESS;Initial Catalog=WIMS_Database;Integrated Security=True;";
                SqlCommand cmd = new SqlCommand("AddPriceToWin", c);
                cmd.CommandType = CommandType.StoredProcedure;

                cmd.Parameters.Add("@TwitcherId", SqlDbType.Int);
                cmd.Parameters["@TwitcherId"].Value = (int)p.Twitcher.Id;

                //SqlCommand getIfOfInsertingPrice = new SqlCommand("SELECT MAX(Id) FROM PriceToWIn", c);
                //c.Open();
                //int insertingId = (int)getIfOfInsertingPrice.ExecuteScalar() + 1;
                //c.Close();

                Auction StartAuction = new Auction(p.AuctionStartValue);
                //on crée une fausse enchère à la valeur de l'offre initiale du streamer
                SqlCommand insertFalseAuction = new SqlCommand("INSERT INTO Auction (CurrentAuction, TwitcherId, UserId) VALUES (" + p.AuctionStartValue + ", " + p.Twitcher.Id + ", " + p.Twitcher.Id + ")", c);
                c.Open();
                int applyInsert = insertFalseAuction.ExecuteNonQuery();
                c.Close();

                SqlCommand getIdFalseAuction = new SqlCommand("Select MAX(Id) FROM Auction WHERE UserId = TwitcherId AND UserId = " + p.Twitcher.Id, c);
                c.Open();
                int idJustInserted = (int)getIdFalseAuction.ExecuteScalar();
                c.Close();

                cmd.Parameters.Add("@CurrentBestAuction", SqlDbType.Int);
                cmd.Parameters["@CurrentBestAuction"].Value = idJustInserted;
                
                cmd.Parameters.Add("@OfferEnd", SqlDbType.DateTime);
                cmd.Parameters["@OfferEnd"].Value = (DateTime)p.OfferEnd;

                cmd.Parameters.Add("@GameId", SqlDbType.Int);
                cmd.Parameters["@GameId"].Value = (int)p.Game.Id;

                cmd.Parameters.Add("@AuctionStartValue", SqlDbType.Int);
                cmd.Parameters["@AuctionStartValue"].Value = (int)p.AuctionStartValue;

                cmd.Parameters.Add("@Active", SqlDbType.Bit);
                p.Active = true;
                cmd.Parameters["@Active"].Value = (bool)p.Active;

                c.Open();
                int rowsAffected = cmd.ExecuteNonQuery();
                c.Close();
            }

            listFromDB.Add(p);
        }

        public void Put(int id, [FromBody]PriceToWin p)
        {
            PriceToWin priceToModify = this.Get(id);
            int index = listFromDB.FindIndex(x => x.Id == priceToModify.Id);

            listFromDB.Remove(priceToModify);

            using (SqlConnection c = new SqlConnection())
            {
                c.ConnectionString = ConfigurationManager.ConnectionStrings[ConnectionStringID].ConnectionString;
                //c.ConnectionString = @"Data Source=TFNSSC07\SQLEXPRESS;Initial Catalog=WIMS_Database;Integrated Security=True;";
                SqlCommand cmd = new SqlCommand("UpdatePriceToWin", c);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.Add("@Id", SqlDbType.Int);
                cmd.Parameters["@Id"].Value = id;

                cmd.Parameters.Add("@OfferEnd", SqlDbType.DateTime);
                cmd.Parameters["@OfferEnd"].Value = (DateTime)p.OfferEnd;

                //cmd.Parameters.Add("@CurrentBestAuction", SqlDbType.Int);
                //cmd.Parameters["@CurrentBestAuction"].Value = (int)p.CurrentBestAuction.Id;

                cmd.Parameters.Add("@Active", SqlDbType.Bit);
                cmd.Parameters["@Active"].Value = (bool)p.Active;
                
                c.Open();
                int rowsAffected = cmd.ExecuteNonQuery();
                c.Close();
            }

            listFromDB.Add(p);
        }

        public void Delete(int id)
        {
            using (SqlConnection c = new SqlConnection())
            {
                c.ConnectionString = ConfigurationManager.ConnectionStrings[ConnectionStringID].ConnectionString;
                //c.ConnectionString = @"Data Source=TFNSSC07\SQLEXPRESS;Initial Catalog=WIMS_Database;Integrated Security=True;";
                SqlCommand cmd = new SqlCommand("DELETE FROM PriceToWin WHERE Id = @id", c);
                cmd.Parameters.Add("@id", SqlDbType.Int);
                cmd.Parameters["@id"].Value = id;
                c.Open();
                int rowsAffected = cmd.ExecuteNonQuery();
                c.Close();
            }
        }
    }
}
