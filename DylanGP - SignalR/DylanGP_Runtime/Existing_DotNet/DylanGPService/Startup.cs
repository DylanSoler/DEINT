using Microsoft.Owin;
using Owin;

[assembly: OwinStartup(typeof(DylanGPService.Startup))]

namespace DylanGPService
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureMobileApp(app);
            app.MapSignalR();
        }
    }
}