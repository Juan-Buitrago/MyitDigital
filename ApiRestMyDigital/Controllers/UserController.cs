using MyDigitalBusiness.Implementation;
using MyDigitalBusiness.Interfaces;
using MyDigitalInfraestructure.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace ApiRestMyDigital.Controllers
{
    [RoutePrefix("User")]
    public class UserController : ApiController
    {
        #region Dependency Injection
        private readonly IUser _UserService;
        #endregion

        public UserController(IUser UserService)
        {
            _UserService = UserService;
        }

        #region Méthods
        [HttpPost]
        [Route("Save")]
        public IHttpActionResult saveUser([FromBody] UserModel user)
        {
            return Json(_UserService.SaveUser(user));
        }

        [HttpPost]
        [Route("Delete")]
        public IHttpActionResult deleteUser([FromBody] UserModel user)
        {
            return Json(_UserService.DeleteUser(user));
        }

        [HttpGet]
        [Route("GetList")]
        public IHttpActionResult GetList()
        {
            return Json(_UserService.GetUsers());
        }
        #endregion
    }
}
