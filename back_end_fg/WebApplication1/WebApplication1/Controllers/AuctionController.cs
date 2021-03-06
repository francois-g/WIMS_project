﻿using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;
using WebApplication1.Authenticators;
using WebApplication1.Repositories;
using WimsApiMKI.Models;

namespace WebApplication1.Controllers
{
    [EnableCors("*", "*", "*")]
    public class AuctionController : ApiController
    {
        AuctionRepository repo = new AuctionRepository();

        public IEnumerable<Auction> Get()
        {
            return this.repo.getAll();

            #region copied in repository
            //    using (SqlConnection c = new SqlConnection())
            //    {
            //        c.ConnectionString = ConfigurationManager.ConnectionStrings[ConnectionStringID].ConnectionString;
            //        //c.ConnectionString = @"Data Source=TFNSSC07\SQLEXPRESS;Initial Catalog=WIMS_Database;Integrated Security=True;";
            //        using (SqlCommand cmd = c.CreateCommand())
            //        {
            //            cmd.CommandText = "SelectAuction";
            //            cmd.CommandType = CommandType.StoredProcedure;
            //            c.Open();
            //            using (SqlDataReader reader = cmd.ExecuteReader())
            //            {
            //                while (reader.Read())
            //                {
            //                    Auction auction = new Auction();
            //                    auction.Id = (int)reader[0];
            //                    auction.Twitcher.Id = (int)reader[1];
            //                    auction.User.Id = (int)reader[2];
            //                    auction.MinAuction = (reader[3] is DBNull) ? null : (int?)reader[3];
            //                    auction.MaxAuction = (reader[4] is DBNull) ? null : (int?)reader[4];
            //                    auction.CurrentAuction = (int)reader[5];
            //                    auction.AuctionDate = (reader[6] is DBNull) ? null : (DateTime?)reader[6];
            //                    auction.AuctionValidation = (bool)reader[7];
            //                    auction.IdPrice = (reader[8] is DBNull) ? 0 : (int)reader[8];
            //                    auction.Active = (bool)reader[9];
            //                    listFromDB.Add(auction);
            //                }
            //            }
            //            c.Close();
            //        }
            //    }

            //    return listFromDB;
            #endregion
        }

        [TokenAuthenticator(Domain: "auctionDom")]
        public Auction Get(int id)
        {
            return this.repo.getById(id);

            #region copied in repository
            //    Auction auc = new Auction();

            //    using (SqlConnection c = new SqlConnection())
            //    {
            //        c.ConnectionString = ConfigurationManager.ConnectionStrings[ConnectionStringID].ConnectionString;
            //        //c.ConnectionString = @"Data Source=TFNSSC07\SQLEXPRESS;Initial Catalog=WIMS_Database;Integrated Security=True;";
            //        SqlCommand cmd = new SqlCommand("SelectAuctionById", c);
            //        cmd.CommandType = CommandType.StoredProcedure;
            //        cmd.Parameters.Add("@Id", SqlDbType.Int);
            //        cmd.Parameters["@Id"].Value = id;

            //        c.Open();
            //        using (SqlDataReader reader = cmd.ExecuteReader())
            //        {
            //            while (reader.Read())
            //            {
            //                auc.Id = (int)reader[0];
            //                auc.Twitcher.Id = (int)reader[1];
            //                auc.User.Id = (int)reader[2];
            //                auc.MinAuction = (reader[3] is DBNull) ? null : (int?)reader[3];
            //                auc.MaxAuction = (reader[4] is DBNull) ? null : (int?)reader[4];
            //                auc.CurrentAuction = (int)reader[5];
            //                auc.AuctionDate = (reader[6] is DBNull) ? null : (DateTime?)reader[6];
            //                auc.AuctionValidation = (bool)reader[7];
            //                auc.AuctionPrice.Id = (int)reader[8];
            //                auc.Active = (bool)reader[9];
            //            }
            //        }
            //        c.Close();
            //    }

            //    return auc;
            #endregion
        }

        [TokenAuthenticator(Domain: "auctionDom")]
        [Authorize(Roles = "Admin, Viewer, Streamer")]
        public void Post([FromBody]Auction auc)
        {
            this.repo.add(auc);

            #region copied in repository
            //    using (SqlConnection c = new SqlConnection())
            //    {
            //        c.ConnectionString = ConfigurationManager.ConnectionStrings[ConnectionStringID].ConnectionString;
            //        //c.ConnectionString = @"Data Source=TFNSSC07\SQLEXPRESS;Initial Catalog=WIMS_Database;Integrated Security=True;";

            //        SqlCommand cmd2 = new SqlCommand("SELECT MAX(CurrentAuction) FROM Auction WHERE PriceId = @PriceIdFromAuctionTable", c);
            //        cmd2.Parameters.Add("@PriceIdFromAuctionTable", SqlDbType.Int);
            //        cmd2.Parameters["@PriceIdFromAuctionTable"].Value = auc.AuctionPrice.Id;
            //        int best = new int();
            //        c.Open();
            //        using (SqlDataReader reader = cmd2.ExecuteReader())
            //        {
            //            while (reader.Read())
            //            {
            //                best = (int)reader[0];
            //            }
            //        }
            //        c.Close();

            //        if (auc.CurrentAuction > best)
            //        {
            //            SqlCommand cmd = new SqlCommand("AddAuction", c);
            //            cmd.CommandType = CommandType.StoredProcedure;

            //            #region paramètres de l'enchère ajoutée

            //            cmd.Parameters.Add("@TwitcherId", SqlDbType.Int);
            //            cmd.Parameters["@TwitcherId"].Value = (int)auc.Twitcher.Id;

            //            cmd.Parameters.Add("@UserId", SqlDbType.Int);
            //            cmd.Parameters["@UserId"].Value = (int)auc.User.Id;

            //            cmd.Parameters.Add("@MinAuction", SqlDbType.Int);
            //            cmd.Parameters["@MinAuction"].Value = (int?)auc.MinAuction;

            //            cmd.Parameters.Add("@MaxAuction", SqlDbType.Int);
            //            cmd.Parameters["@MaxAuction"].Value = (int?)auc.MaxAuction;

            //            cmd.Parameters.Add("@CurrentAuction", SqlDbType.Int);
            //            cmd.Parameters["@CurrentAuction"].Value = (int)auc.CurrentAuction;

            //            cmd.Parameters.Add("@AuctionDate", SqlDbType.DateTime);
            //            auc.AuctionDate = DateTime.Now;
            //            cmd.Parameters["@AuctionDate"].Value = (DateTime)auc.AuctionDate;

            //            cmd.Parameters.Add("@AuctionValidation", SqlDbType.Bit);
            //            cmd.Parameters["@AuctionValidation"].Value = (bool)auc.AuctionValidation;

            //            cmd.Parameters.Add("@PriceId", SqlDbType.Int);
            //            cmd.Parameters["@PriceId"].Value = (int)auc.AuctionPrice.Id;

            //            cmd.Parameters.Add("@Active", SqlDbType.Bit);
            //            auc.Active = true;
            //            cmd.Parameters["@Active"].Value = (bool)auc.Active;

            //            #endregion

            //            c.Open();
            //            int rowsAffected = cmd.ExecuteNonQuery();
            //            c.Close();

            //            SqlCommand updateCurrentInOffer = new SqlCommand("UpdatePriceToWin", c);
            //            updateCurrentInOffer.CommandType = CommandType.StoredProcedure;
            //            updateCurrentInOffer.Parameters.Add("@Id", SqlDbType.Int);
            //            updateCurrentInOffer.Parameters["@Id"].Value = (int)auc.AuctionPrice.Id;

            //            SqlCommand findInsertedAuctionId = new SqlCommand("Select MAX(Id) FROM Auction WHERE PriceId = " + auc.AuctionPrice.Id, c);
            //            int found = new int();
            //            c.Open();
            //            using (SqlDataReader reader = findInsertedAuctionId.ExecuteReader())
            //            {
            //                while (reader.Read())
            //                {
            //                    found = (int)reader[0];
            //                }
            //            }
            //            c.Close();
            //            updateCurrentInOffer.Parameters.Add("@CurrentBestAuction", SqlDbType.Int);
            //            updateCurrentInOffer.Parameters["@CurrentBestAuction"].Value = (int)found;
            //            updateCurrentInOffer.Parameters.Add("@Active", SqlDbType.Bit);
            //            updateCurrentInOffer.Parameters["@Active"].Value = (bool)auc.Active;
            //            c.Open();
            //            int exec = updateCurrentInOffer.ExecuteNonQuery();
            //            c.Close();
            //        }

            //        //cmd.Parameters.Add("@AuctionDate", SqlDbType.DateTime);
            //        //auc.AuctionDate = DateTime.Now;
            //        //cmd.Parameters["@AuctionDate"].Value = (DateTime)auc.AuctionDate;
            //        ////DateTime.Now

            //        //cmd.Parameters.Add("@AuctionValidation", SqlDbType.Bit);
            //        //cmd.Parameters["@AuctionValidation"].Value = (bool)auc.AuctionValidation;

            //        //cmd.Parameters.Add("@PriceId", SqlDbType.Int);
            //        //cmd.Parameters["@PriceId"].Value = (int)auc.AuctionPrice.Id;

            //        //cmd.Parameters.Add("@Active", SqlDbType.Bit);
            //        //auc.Active = true;
            //        //cmd.Parameters["@Active"].Value = (bool)auc.Active;

            //        //#endregion

            //        //c.Open();
            //        //int rowsAffected = cmd.ExecuteNonQuery();
            //        //c.Close();
            //    }

            //    listFromDB.Add(auc);
            #endregion
        }

        [TokenAuthenticator(Domain: "auctionDom")]
        [Authorize(Roles = "Admin")]
        public void Put(int id, [FromBody]Auction auc)
        {
            this.repo.update(id, auc);

            #region copied in repository
            //    Auction auctionToModify = this.Get(id);
            //    listFromDB.Remove(auctionToModify);

            //    using (SqlConnection c = new SqlConnection())
            //    {
            //        c.ConnectionString = ConfigurationManager.ConnectionStrings[ConnectionStringID].ConnectionString;
            //        //c.ConnectionString = @"Data Source=TFNSSC07\SQLEXPRESS;Initial Catalog=WIMS_Database;Integrated Security=True;";
            //        SqlCommand cmd = new SqlCommand("UpdateAuction", c);
            //        cmd.CommandType = CommandType.StoredProcedure;
            //        cmd.Parameters.Add("@Id", SqlDbType.Int);
            //        cmd.Parameters["@Id"].Value = id;

            //        cmd.Parameters.Add("@TwitcherId", SqlDbType.Int);
            //        cmd.Parameters["@TwitcherId"].Value = (int)auc.Twitcher.Id;

            //        cmd.Parameters.Add("@UserId", SqlDbType.Int);
            //        cmd.Parameters["@UserId"].Value = (int)auc.User.Id;

            //        cmd.Parameters.Add("@MinAuction", SqlDbType.Int);
            //        cmd.Parameters["@MinAuction"].Value = (int?)auc.MinAuction;

            //        cmd.Parameters.Add("@MaxAuction", SqlDbType.Int);
            //        cmd.Parameters["@MaxAuction"].Value = (int?)auc.MaxAuction;

            //        cmd.Parameters.Add("@CurrentAuction", SqlDbType.Int);
            //        cmd.Parameters["@CurrentAuction"].Value = (int)auc.CurrentAuction;

            //        cmd.Parameters.Add("@AuctionDate", SqlDbType.DateTime);
            //        cmd.Parameters["@AuctionDate"].Value = (DateTime)auc.AuctionDate;
            //        //DateTime.Now

            //        cmd.Parameters.Add("@AuctionValidation", SqlDbType.Bit);
            //        cmd.Parameters["@AuctionValidation"].Value = (bool)auc.AuctionValidation;

            //        cmd.Parameters.Add("@Active", SqlDbType.Bit);
            //        cmd.Parameters["@Active"].Value = (bool)auc.Active;

            //        c.Open();
            //        int rowsAffected = cmd.ExecuteNonQuery();
            //        c.Close();
            //    }

            //    listFromDB.Add(auc);
            #endregion
        }

        [TokenAuthenticator(Domain: "auctionDom")]
        [Authorize(Roles = "Admin")]
        public void Delete(int id)
        {
            this.repo.delete(id, "Auction");

            #region copied in repository
            //    using (SqlConnection c = new SqlConnection())
            //    {
            //        c.ConnectionString = ConfigurationManager.ConnectionStrings[ConnectionStringID].ConnectionString;
            //        //c.ConnectionString = @"Data Source=TFNSSC07\SQLEXPRESS;Initial Catalog=WIMS_Database;Integrated Security=True;";
            //        SqlCommand cmd = new SqlCommand("DeleteAuction", c);
            //        cmd.CommandType = CommandType.StoredProcedure;
            //        cmd.Parameters.Add("@Id", SqlDbType.Int);
            //        cmd.Parameters["@Id"].Value = id;

            //        c.Open();
            //        int rowsAffected = cmd.ExecuteNonQuery();
            //        c.Close();
            //    }
            #endregion
        }
    }
}
