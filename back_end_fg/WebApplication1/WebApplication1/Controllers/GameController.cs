using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using WimsApiMKI.Models;

namespace WebApplication1.Controllers
{
    public class GameController : ApiController
    {
        List<Game> listFromDB = new List<Game>();
        static string ServerName = System.Net.Dns.GetHostName();
        static string ConnectionStringID =
                (ServerName == "TFNSSC07") ? "LocalConnection" : "DefaultConnection";

        public IEnumerable<Game> Get()
        {
            using (SqlConnection c = new SqlConnection())
            {
                c.ConnectionString = ConfigurationManager.ConnectionStrings[ConnectionStringID].ConnectionString;
                //c.ConnectionString = @"Data Source=TFNSSC07\SQLEXPRESS;Initial Catalog=WIMS_Database;Integrated Security=True;";
                using (SqlCommand cmd = c.CreateCommand())
                {
                    //cmd.CommandText = "SELECT * FROM currency";
                    cmd.CommandText = "SelectGame";
                    cmd.CommandType = CommandType.StoredProcedure;
                    c.Open();
                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        while (reader.Read())
                        {
                            Game g = new Game();
                            g.Id = (int)reader[0];
                            g.GameName = (string)reader[1].ToString().Trim();
                            g.GameImage = (string)reader[2];
                            g.Active = (bool)reader[3];
                            listFromDB.Add(g);
                        }
                    }
                    c.Close();
                }
            }

            return listFromDB;
        }

        public Game Get(int id)
        {
            Game g = new Game();
            using (SqlConnection c = new SqlConnection())
            {
                c.ConnectionString = ConfigurationManager.ConnectionStrings[ConnectionStringID].ConnectionString;
                //c.ConnectionString = @"Data Source=TFNSSC07\SQLEXPRESS;Initial Catalog=WIMS_Database;Integrated Security=True;";
                SqlCommand cmd = new SqlCommand("SelectGameById", c);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.Add("@GameId", SqlDbType.Int);
                cmd.Parameters["@GameId"].Value = id;

                c.Open();
                using (SqlDataReader reader = cmd.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        g.Id = (int)reader[0];
                        g.GameName = (string)reader[1].ToString().Trim();
                        g.GameImage = (string)reader[2];
                        //g.Active = (bool)reader[3];
                    }
                }
                c.Close();
            }
            return g;
        }
        
        public void Post([FromBody]Game g)
        {
            using (SqlConnection c = new SqlConnection())
            {
                c.ConnectionString = ConfigurationManager.ConnectionStrings[ConnectionStringID].ConnectionString;
                //c.ConnectionString = @"Data Source=TFNSSC07\SQLEXPRESS;Initial Catalog=WIMS_Database;Integrated Security=True;";
                SqlCommand cmd = new SqlCommand("AddGame", c);
                cmd.CommandType = CommandType.StoredProcedure;

                cmd.Parameters.Add("@GameName", SqlDbType.Text);
                cmd.Parameters["@GameName"].Value = (string)g.GameName;

                cmd.Parameters.Add("@GameImg", SqlDbType.Text);
                cmd.Parameters["@GameImg"].Value = (string)g.GameImage;

                c.Open();
                int rowsAffected = cmd.ExecuteNonQuery();
                c.Close();
            }

            listFromDB.Add(g);
        }

        public void Put(int id, [FromBody]Game g)
        {
            Game gameToModify = this.Get(id);
            listFromDB.Remove(gameToModify);

            using (SqlConnection c = new SqlConnection())
            {
                c.ConnectionString = ConfigurationManager.ConnectionStrings[ConnectionStringID].ConnectionString;
                //c.ConnectionString = @"Data Source=TFNSSC07\SQLEXPRESS;Initial Catalog=WIMS_Database;Integrated Security=True;";
                SqlCommand cmd = new SqlCommand("UpdateGame", c);
                cmd.CommandType = CommandType.StoredProcedure;

                cmd.Parameters.Add("@GameId", SqlDbType.Int);
                cmd.Parameters["@GameId"].Value = id;

                cmd.Parameters.Add("@GameName", SqlDbType.Text);
                cmd.Parameters["@GameName"].Value = g.GameName;

                if (g.GameImage != null)
                {
                    cmd.Parameters.Add("@GameImg", SqlDbType.Text);
                    cmd.Parameters["@GameImg"].Value = (string)g.GameImage;
                }
                else
                {
                    cmd.Parameters.Add("@GameImg", SqlDbType.Text);
                    cmd.Parameters["@GameImg"].Value = (string)gameToModify.GameImage;
                }

                c.Open();
                int rowsAffected = cmd.ExecuteNonQuery();
                c.Close();
            }

            listFromDB.Add(g);
        }

        public void Delete(int id)
        {
            using (SqlConnection c = new SqlConnection())
            {
                c.ConnectionString = ConfigurationManager.ConnectionStrings[ConnectionStringID].ConnectionString;
                //c.ConnectionString = @"Data Source=TFNSSC07\SQLEXPRESS;Initial Catalog=WIMS_Database;Integrated Security=True;";
                SqlCommand cmd = new SqlCommand("DELETE FROM Game WHERE Id = @id", c);
                cmd.Parameters.Add("@id", SqlDbType.Int);
                cmd.Parameters["@id"].Value = id;
                c.Open();
                int rowsAffected = cmd.ExecuteNonQuery();
                c.Close();
            }
        }
    }
}
