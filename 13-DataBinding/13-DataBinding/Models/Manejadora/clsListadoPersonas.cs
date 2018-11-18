using _13_DataBinding.Models.Entidades;
using System;
using System.Collections.Generic;
using System.Linq;

namespace _13_DataBinding.Models.Manejadora
{
    public class clsListadoPersonas
    {

        /// <summary>
        /// Funcion que nos devuelve un listado completo de personas
        /// </summary>
        /// <returns></returns>
        public List<clsPersona> listadoCompletoPersonas() {

            List<clsPersona> personas = new List<clsPersona>();

            personas.Add(new clsPersona(1,"Dylan","Soler", new DateTime(1993,4,12),"calle Sevilla","666666666", 1));
            personas.Add(new clsPersona(1, "Pepe", "Pepon", new DateTime(1991, 6, 1), "calle Pepepe", "666666666", 2));
            personas.Add(new clsPersona(1, "Paco", "Perez", new DateTime(1993, 4, 12), "calle Cualquiera", "666666666", 2));
            personas.Add(new clsPersona(1, "Jose Fernanda", "Escombro", new DateTime(1993, 4, 12), "calle Esa", "666666666", 3));
            personas.Add(new clsPersona(1, "Manuela", "Muela", new DateTime(1993, 4, 12), "calle Al final del pasillo a la derecha", "666666666", 1));


            return personas;
        } 

    }
}