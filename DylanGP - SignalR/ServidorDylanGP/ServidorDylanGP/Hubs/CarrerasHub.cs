using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Microsoft.AspNet.SignalR;

namespace ServidorDylanGP.Hubs
{
    public class CarrerasHub : Hub
    {
        public void Hello()
        {
            Clients.All.hello();
        }
    }
}