﻿using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using System.Web.Http;
using WimsApiMKI.Models;

namespace WebApplication1.Repositories
{
    public class AuctionRepository : BaseRepository
    {
        List<Auction> listFromDB = new List<Auction>();
        static string ServerName = System.Net.Dns.GetHostName();
        static string ConnectionStringID =
                (ServerName == "TFNSSC07") ? "LocalConnection" : "DefaultConnection";

        UserRepository uRepo = new UserRepository();
        PriceToWinRepository pRepo = new PriceToWinRepository();

        public IEnumerable<Auction> getAll()
        {
            using (SqlConnection c = new SqlConnection())
            {
                c.ConnectionString = ConfigurationManager.ConnectionStrings[ConnectionStringID].ConnectionString;
                //c.ConnectionString = @"Data Source=TFNSSC07\SQLEXPRESS;Initial Catalog=WIMS_Database;Integrated Security=True;";
                using (SqlCommand cmd = c.CreateCommand())
                {
                    cmd.CommandText = "SelectAuction";
                    cmd.CommandType = CommandType.StoredProcedure;
                    c.Open();
                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        while (reader.Read())
                        {
                            Auction auction = new Auction();
                            auction.Id = (int)reader[0];
                            auction.User = uRepo.getById((int)reader[1]);
                            //auction.User.Id = (int)reader[1];
                            auction.MinAuction = (reader[2] is DBNull) ? null : (int?)reader[2];
                            auction.MaxAuction = (reader[3] is DBNull) ? null : (int?)reader[3];
                            auction.CurrentAuction = (int)reader[4];
                            auction.AuctionDate = (reader[5] is DBNull) ? null : (DateTime?)reader[5];
                            auction.AuctionValidation = (bool)reader[6];
                            auction.IdPrice = (reader[7] is DBNull) ? 0 : (int)reader[7];
                            if (auction.IdPrice != 0)
                            {
                                auction.AuctionPrice = pRepo.getById(auction.IdPrice);
                            }
                            listFromDB.Add(auction);
                        }
                    }
                    c.Close();
                }
            }

            return listFromDB;
        }

        public Auction getById(int id)
        {
            Auction auc = new Auction();

            using (SqlConnection c = new SqlConnection())
            {
                c.ConnectionString = ConfigurationManager.ConnectionStrings[ConnectionStringID].ConnectionString;
                //c.ConnectionString = @"Data Source=TFNSSC07\SQLEXPRESS;Initial Catalog=WIMS_Database;Integrated Security=True;";
                SqlCommand cmd = new SqlCommand("SelectAuctionById", c);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.Add("@Id", SqlDbType.Int);
                cmd.Parameters["@Id"].Value = id;

                c.Open();
                using (SqlDataReader reader = cmd.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        auc.Id = (int)reader[0];
                        auc.User = uRepo.getById((int)reader[1]);
                        //auction.User.Id = (int)reader[1];
                        auc.MinAuction = (reader[2] is DBNull) ? null : (int?)reader[2];
                        auc.MaxAuction = (reader[3] is DBNull) ? null : (int?)reader[3];
                        auc.CurrentAuction = (int)reader[4];
                        auc.AuctionDate = (reader[5] is DBNull) ? null : (DateTime?)reader[5];
                        auc.AuctionValidation = (bool)reader[6];
                        auc.AuctionPrice.Id = (int)reader[7];
                        if (auc.IdPrice != 0)
                        {
                            auc.AuctionPrice = pRepo.getById(auc.IdPrice);
                        }
                    }
                }
                c.Close();
            }

            return auc;
        }

        public void add(Auction auc)
        {
            using (SqlConnection c = new SqlConnection())
            {
                c.ConnectionString = ConfigurationManager.ConnectionStrings[ConnectionStringID].ConnectionString;
                //c.ConnectionString = @"Data Source=TFNSSC07\SQLEXPRESS;Initial Catalog=WIMS_Database;Integrated Security=True;";

                SqlCommand cmd2 = new SqlCommand("SELECT MAX(CurrentAuction) FROM Auction WHERE OfferId = @PriceIdFromAuctionTable", c);
                cmd2.Parameters.Add("@PriceIdFromAuctionTable", SqlDbType.Int);
                cmd2.Parameters["@PriceIdFromAuctionTable"].Value = auc.IdPrice;
                int best = new int();
                c.Open();
                using (SqlDataReader reader = cmd2.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        best = (reader[0] is DBNull) ? 0 : (int)reader[0];
                    }
                }
                c.Close();

                SqlCommand selectOfferEnd = new SqlCommand("SELECT OfferEnd FROM PriceToWin WHERE Id = " + auc.IdPrice, c);
                c.Open();
                DateTime dateToCompare = (DateTime)selectOfferEnd.ExecuteScalar();
                c.Close();

                SqlCommand selectStartValue = new SqlCommand("SELECT AuctionStartValue FROM PriceToWin WHERE Id = " + auc.IdPrice, c);
                c.Open();
                int startValue = (int)selectStartValue.ExecuteScalar();
                c.Close();

                if (auc.CurrentAuction >= startValue && auc.CurrentAuction > best && auc.AuctionDate < dateToCompare)
                {
                    SqlCommand cmd = new SqlCommand("AddAuction", c);
                    cmd.CommandType = CommandType.StoredProcedure;

                    #region paramètres de l'enchère ajoutée

                    cmd.Parameters.Add("@UserId", SqlDbType.Int);
                    cmd.Parameters["@UserId"].Value = (int)auc.User.Id;

                    cmd.Parameters.Add("@MinAuction", SqlDbType.Int);
                    cmd.Parameters["@MinAuction"].Value = (int?)auc.MinAuction;

                    cmd.Parameters.Add("@MaxAuction", SqlDbType.Int);
                    cmd.Parameters["@MaxAuction"].Value = (int?)auc.MaxAuction;

                    cmd.Parameters.Add("@CurrentAuction", SqlDbType.Int);
                    cmd.Parameters["@CurrentAuction"].Value = (int)auc.CurrentAuction;

                    cmd.Parameters.Add("@AuctionDate", SqlDbType.DateTime);
                    auc.AuctionDate = DateTime.Now;
                    cmd.Parameters["@AuctionDate"].Value = (DateTime)auc.AuctionDate;

                    cmd.Parameters.Add("@AuctionValidation", SqlDbType.Bit);
                    cmd.Parameters["@AuctionValidation"].Value = (bool)auc.AuctionValidation;

                    cmd.Parameters.Add("@OfferId", SqlDbType.Int);
                    cmd.Parameters["@OfferId"].Value = (int)auc.IdPrice;

                    #endregion

                    c.Open();
                    int rowsAffected = cmd.ExecuteNonQuery();
                    c.Close();
                    

                    SqlCommand updateCurrentInOffer = new SqlCommand("UpdatePriceToWin", c);
                    updateCurrentInOffer.CommandType = CommandType.StoredProcedure;
                    updateCurrentInOffer.Parameters.Add("@Id", SqlDbType.Int);
                    updateCurrentInOffer.Parameters["@Id"].Value = (int)auc.AuctionPrice.Id;

                    updateCurrentInOffer.Parameters.Add("@OfferEnd", SqlDbType.DateTime);
                    updateCurrentInOffer.Parameters["@OfferEnd"].Value = dateToCompare;

                    updateCurrentInOffer.Parameters.Add("@Active", SqlDbType.Bit);
                    updateCurrentInOffer.Parameters["@Active"].Value = (dateToCompare < auc.AuctionDate) ? true : false;
                    

                    SqlCommand findInsertedAuctionId = new SqlCommand("Select MAX(Id) FROM Auction WHERE OfferId = " + auc.IdPrice, c);
                    int found = new int();
                    c.Open();
                    using (SqlDataReader reader = findInsertedAuctionId.ExecuteReader())
                    {
                        while (reader.Read())
                        {
                            found = (int)reader[0];
                        }
                    }
                    c.Close();

                    c.Open();
                    int exec = updateCurrentInOffer.ExecuteNonQuery();
                    c.Close();
                }
            }

            listFromDB.Add(auc);
        }

        public void update(int id, Auction auc)
        {
            Auction auctionToModify = this.getById(id);
            listFromDB.Remove(auctionToModify);

            using (SqlConnection c = new SqlConnection())
            {
                c.ConnectionString = ConfigurationManager.ConnectionStrings[ConnectionStringID].ConnectionString;
                //c.ConnectionString = @"Data Source=TFNSSC07\SQLEXPRESS;Initial Catalog=WIMS_Database;Integrated Security=True;";
                SqlCommand cmd = new SqlCommand("UpdateAuction", c);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.Add("@Id", SqlDbType.Int);
                cmd.Parameters["@Id"].Value = id;

                cmd.Parameters.Add("@UserId", SqlDbType.Int);
                cmd.Parameters["@UserId"].Value = (int)auc.User.Id;

                cmd.Parameters.Add("@MinAuction", SqlDbType.Int);
                cmd.Parameters["@MinAuction"].Value = (int?)auc.MinAuction;

                cmd.Parameters.Add("@MaxAuction", SqlDbType.Int);
                cmd.Parameters["@MaxAuction"].Value = (int?)auc.MaxAuction;

                cmd.Parameters.Add("@CurrentAuction", SqlDbType.Int);
                cmd.Parameters["@CurrentAuction"].Value = (int)auc.CurrentAuction;

                cmd.Parameters.Add("@AuctionDate", SqlDbType.DateTime);
                cmd.Parameters["@AuctionDate"].Value = (DateTime)auc.AuctionDate;
                //DateTime.Now

                cmd.Parameters.Add("@AuctionValidation", SqlDbType.Bit);
                cmd.Parameters["@AuctionValidation"].Value = (bool)auc.AuctionValidation;

                //cmd.Parameters.Add("@Active", SqlDbType.Bit);
                //cmd.Parameters["@Active"].Value = (bool)auc.Active;

                c.Open();
                int rowsAffected = cmd.ExecuteNonQuery();
                c.Close();
            }

            listFromDB.Add(auc);
        }
    }
}
