using MyDigitalBusiness.Interfaces;
using MyDigitalInfraestructure.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MySql.Data.MySqlClient;
using System.Data;

namespace MyDigitalBusiness.Implementation
{
    public class User : IUser
    {
        public List<UserModel> GetUsers() {

            List<UserModel> userList = new List<UserModel>();

            try
            {

                string connectionString = "datasource=35.225.48.219;port=3306;username=root;password=1234.asd;database=mydigital;";
                string query = $"SELECT * FROM users WHERE state = 1";

                MySqlConnection databaseConnection = new MySqlConnection(connectionString);
                MySqlCommand commandDatabase = new MySqlCommand(query, databaseConnection);
                commandDatabase.CommandTimeout = 60;

                MySqlDataAdapter MyAdapter = new MySqlDataAdapter();
                MyAdapter.SelectCommand = commandDatabase;
                DataTable dt = new DataTable();
                MyAdapter.Fill(dt);
        
                userList = (from DataRow dr in dt.Rows

                            select new UserModel()
                               {
                                    Id = int.Parse(dr["Id"].ToString()),
                                    Name = dr["name"].ToString(),
                                    LastName = dr["lastname"].ToString(),
                                    Dni = dr["dni"].ToString(),
                                    NetworkUser = dr["networkuser"].ToString(),
                                    Email = dr["email"].ToString(),
                                    BirthDate = Convert.ToDateTime(dr["birthdate"].ToString()).ToString("MM/dd/yyyy"),
                                    LowDate = Convert.ToDateTime(dr["lowdate"].ToString()).ToString("MM/dd/yyyy"),
                               }).ToList();

            }
            catch (Exception ex)
            {
            }

            return userList;
        }

        public string SaveUser(UserModel user)
        {
            string connectionString = "datasource=35.225.48.219;port=3306;username=root;password=1234.asd;database=mydigital;";
            string query = $"INSERT INTO users(id, name, lastname, dni, networkuser, email, birthdate, lowdate, state) " +
                           $"VALUES (NULL, '{user.Name}', '{user.LastName}', '{user.Dni}', '{user.NetworkUser}', '{user.Email}', '{user.BirthDate}','{user.LowDate}',1)" +
                           $"ON DUPLICATE KEY UPDATE name='{user.Name}', lastname='{user.LastName}', dni='{user.Dni}', networkuser='{user.NetworkUser}', email='{user.Email}'," +
                           $"birthdate='{user.BirthDate}', lowdate='{user.LowDate}'";

            MySqlConnection databaseConnection = new MySqlConnection(connectionString);
            MySqlCommand commandDatabase = new MySqlCommand(query, databaseConnection);
            commandDatabase.CommandTimeout = 60;

            try
            {
                databaseConnection.Open();
                MySqlDataReader myReader = commandDatabase.ExecuteReader();

                int record = myReader.RecordsAffected;
                databaseConnection.Close();
                return record >= 1 ? "OK" : "ERROR";

            }
            catch (Exception ex)
            {
                return "ERROR";
            }            
        }

        public string DeleteUser(UserModel user) {

            string connectionString = "datasource=35.225.48.219;port=3306;username=root;password=1234.asd;database=mydigital;";
            string query = $"UPDATE users SET state=0 WHERE id = {user.Id}";

            MySqlConnection databaseConnection = new MySqlConnection(connectionString);
            MySqlCommand commandDatabase = new MySqlCommand(query, databaseConnection);
            commandDatabase.CommandTimeout = 60;

            try
            {
                databaseConnection.Open();
                MySqlDataReader myReader = commandDatabase.ExecuteReader();

                int record = myReader.RecordsAffected;
                databaseConnection.Close();
                return record >= 1 ? "OK" : "ERROR";
            }
            catch (Exception ex)
            {
                return "ERROR";
            }
        }
    }
}
