using DylanGPService.Models;
using Microsoft.AspNet.SignalR;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace DylanGPService.Hubs
{
    public class CarrerasHub : Hub
    {

        public void actualizarJugadores()
        {
            Clients.All.actualizarNumJugadores();
        }

        public void actualizarCoches()
        {
            Clients.All.enviarCoche();
        }

        public void aniadirMiCoche(clsCoche car)
        {
            Clients.Others.addCoches(car);
        }

        public void avanzarPartida(List<clsCoche> listado)
        {
            Clients.All.pintarListado(listado);
        }

        public void ganador(clsCoche coche)
        {
            Clients.All.mostrarGanador(coche.nick);
        }

        public void reiniciar(List<clsCoche> listado)
        {
            foreach (clsCoche c in listado)
            {
                c.posLeft = 0;
            }

            Clients.All.reiniciarPartida(listado);
        }

        public void notificarJugadores(int numJ)
        {
            Clients.Others.notificacionNumJug(numJ);
        }
        public void salir()
        {
            Clients.All.salirJuego();
        }
    }
}