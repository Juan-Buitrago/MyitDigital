using MyDigitalBusiness.Implementation;
using MyDigitalBusiness.Interfaces;
using Ninject;
using Ninject.Extensions.ChildKernel;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Web;
using System.Web.Http.Dependencies;

namespace ApiRestMyDigital.App_Start
{
    public class NinjectResolver: IDependencyResolver
    {
        private IKernel kernel;

        public NinjectResolver() : this(new StandardKernel())
        {

        }

        public NinjectResolver(IKernel ninjectKernel, bool scope = false)
        {
            kernel = ninjectKernel;
            if (!scope)
            {
                AddBindings(kernel);
            }
        }

        private void AddBindings(IKernel kernel)
        {
            kernel.Bind(typeof(IUser)).To(typeof(User)).InSingletonScope();
        }

        private IKernel AddRequestBindings(IKernel kernel)
        {
            // Servicios de Aplicacion
            return kernel;
        }

        public IDependencyScope BeginScope()
        {
            return new NinjectResolver(AddRequestBindings(new ChildKernel(kernel)), true);
        }

        public void Dispose()
        {
        }

        public object GetService(Type serviceType)
        {
            return kernel.TryGet(serviceType);
        }

        public IEnumerable<object> GetServices(Type serviceType)
        {
            return kernel.GetAll(serviceType);
        }

    }
}