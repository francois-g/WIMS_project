using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using System.Web.Http;
using System.Web.Http.Cors;
using System.Web.Mvc;
using WebApplication1.Repositories;
using WimsApiMKI.Models;

namespace WebApplication1.Controllers
{
    [EnableCors("*", "*", "*")]
    public class CurrencyController : ApiController
    {
        CurrencyRepository repo = new CurrencyRepository();

        public IEnumerable<Currency> Get() => this.repo.getAll();
        #region copied in repository
        //using (SqlConnection c = new SqlConnection())//{//    c.ConnectionString = ConfigurationManager.ConnectionStrings[ConnectionStringID].ConnectionString;//    //c.ConnectionString = @"Data Source=TFNSSC07\SQLEXPRESS;Initial Catalog=WIMS_Database;Integrated Security=True;";//    using (SqlCommand cmd = c.CreateCommand())//    {//        //cmd.CommandText = "SELECT * FROM currency";//        cmd.CommandText = "SelectCurrency";//        cmd.CommandType = CommandType.StoredProcedure;//        c.Open();//        using (SqlDataReader reader = cmd.ExecuteReader())//        {//            while (reader.Read())//            {//                Currency currency = new Currency();//                currency.Id = (int)reader[0];//                currency.CurrencyName = (string)reader[1].ToString().Trim();//                currency.ConversionRate = (decimal)reader[2];//                currency.CurrencyShortCut = (string)reader[3].ToString().Trim();//                listFromDB.Add(currency);//            }//        }//        c.Close();//    }//}//return listFromDB;
        #endregion


        public Currency Get(int id)
        {
            return this.repo.getById(id);

            #region copied in repository
            //Currency cur = new Currency();
            //using (SqlConnection c = new SqlConnection())
            //{
            //    c.ConnectionString = ConfigurationManager.ConnectionStrings[ConnectionStringID].ConnectionString;
            //    //c.ConnectionString = @"Data Source=TFNSSC07\SQLEXPRESS;Initial Catalog=WIMS_Database;Integrated Security=True;";
            //    SqlCommand cmd = new SqlCommand("SelectCurrencyById", c);
            //    cmd.CommandType = CommandType.StoredProcedure;
            //    cmd.Parameters.Add("@Id", SqlDbType.Int);
            //    cmd.Parameters["@Id"].Value = id;

            //    //SqlCommand cmd = new SqlCommand("SELECT * FROM Currency WHERE Id = @id", c);
            //    //cmd.Parameters.Add("@id", SqlDbType.Int);
            //    //cmd.Parameters["@id"].Value = id;

            //    c.Open();
            //    using (SqlDataReader reader = cmd.ExecuteReader())
            //    {
            //        while (reader.Read())
            //        {
            //            cur.Id = (int)reader[0];
            //            cur.CurrencyName = (string)reader[1].ToString().Trim();
            //            cur.ConversionRate = (decimal)reader[2];
            //            cur.CurrencyShortCut = (string)reader[3].ToString().Trim();
            //        }
            //    }
            //    c.Close();
            //}
            //return cur;
            #endregion
        }

        public void Post([FromBody]Currency cur)
        {
            this.repo.add(cur);

            #region copied in repository
            //using (SqlConnection c = new SqlConnection())
            //{
            //    c.ConnectionString = ConfigurationManager.ConnectionStrings[ConnectionStringID].ConnectionString;
            //    //c.ConnectionString = @"Data Source=TFNSSC07\SQLEXPRESS;Initial Catalog=WIMS_Database;Integrated Security=True;";
            //    SqlCommand cmd = new SqlCommand("AddCurrency", c);
            //    cmd.CommandType = CommandType.StoredProcedure;

            //    cmd.Parameters.Add("@CurrencyName", SqlDbType.Text);
            //    cmd.Parameters["@CurrencyName"].Value = (string)cur.CurrencyName;

            //    cmd.Parameters.Add("@ConversionRate", SqlDbType.Decimal);
            //    cmd.Parameters["@ConversionRate"].Value = (decimal)cur.ConversionRate;

            //    cmd.Parameters.Add("@CurrencyShortCut", SqlDbType.Text);
            //    cmd.Parameters["@CurrencyShortCut"].Value = (string)cur.CurrencyShortCut;

            //    c.Open();
            //    int rowsAffected = cmd.ExecuteNonQuery();
            //    c.Close();
            //}

            //listFromDB.Add(cur);
            #endregion
        }

        public void Put(int id, [FromBody]Currency cur)
        {
            this.repo.update(id, cur);

            #region copied in repository
            //Currency currencyToModify = this.Get(id);
            //listFromDB.Remove(currencyToModify);

            //using (SqlConnection c = new SqlConnection())
            //{
            //    c.ConnectionString = ConfigurationManager.ConnectionStrings[ConnectionStringID].ConnectionString;
            //    //c.ConnectionString = @"Data Source=TFNSSC07\SQLEXPRESS;Initial Catalog=WIMS_Database;Integrated Security=True;";
            //    SqlCommand cmd = new SqlCommand("UpdateCurrency", c);
            //    cmd.CommandType = CommandType.StoredProcedure;
            //    cmd.Parameters.Add("@Id", SqlDbType.Int);
            //    cmd.Parameters["@Id"].Value = id;

            //    cmd.Parameters.Add("@CurrencyName", SqlDbType.Text);
            //    cmd.Parameters["@CurrencyName"].Value = (string)cur.CurrencyName;

            //    cmd.Parameters.Add("@ConversionRate", SqlDbType.Decimal);
            //    cmd.Parameters["@ConversionRate"].Value = (decimal)cur.ConversionRate;

            //    cmd.Parameters.Add("@CurrencyShortCut", SqlDbType.Text);
            //    cmd.Parameters["@CurrencyShortCut"].Value = cur.CurrencyShortCut;

            //    c.Open();
            //    int rowsAffected = cmd.ExecuteNonQuery();
            //    c.Close();
            //}

            //listFromDB.Add(cur);
            #endregion
        }

        public void Delete(int id)
        {
            this.repo.delete(id, "Currency");

            #region copied in repository
            //using (SqlConnection c = new SqlConnection())
            //{
            //    c.ConnectionString = ConfigurationManager.ConnectionStrings[ConnectionStringID].ConnectionString;
            //    //c.ConnectionString = @"Data Source=TFNSSC07\SQLEXPRESS;Initial Catalog=WIMS_Database;Integrated Security=True;";
            //    SqlCommand cmd = new SqlCommand("DELETE FROM Currency WHERE Id = @id", c);
            //    cmd.Parameters.Add("@id", SqlDbType.Int);
            //    cmd.Parameters["@id"].Value = id;
            //    c.Open();
            //    int rowsAffected = cmd.ExecuteNonQuery();
            //    c.Close();
            //}
            #endregion
        }
    }
}
