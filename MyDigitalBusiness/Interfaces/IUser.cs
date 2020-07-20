using MyDigitalBusiness.Implementation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MyDigitalInfraestructure.Models;

namespace MyDigitalBusiness.Interfaces
{
   public interface IUser
    {
        string SaveUser(UserModel user);
        string DeleteUser(UserModel user);
        List<UserModel> GetUsers();
    }
}
