
using _14_CRUDPersonasUWP_DAL.Manejadoras;
using _14_CRUDPersonasUWP_Entidades;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace _14_CRUDPersonasUWP_BL.Manejadoras
{
    public class clsManejadoraPersona_BL
    {
        /// <summary>
        /// Función que recibe un id y devuelve la persona asociada a ese id de la BBDD
        /// </summary>
        /// <param name="id"></param>
        /// <returns>devuelve la persona con ese id</returns>
        public clsPersona personaPorID_BL(int id)
        {

            clsManejadoraPersona_DAL manejadora = new clsManejadoraPersona_DAL();
            clsPersona oPersona = new clsPersona();

            oPersona = manejadora.personaPorID_DAL(id);

            return oPersona;
        }

        /// <summary>
        /// Función que recibe un id y elimina la persona asociada a ese id de la BBDD, devuelve el numero de filas afectadas
        /// </summary>
        /// <param name="id"></param>
        /// <returns>devuelve un entero con el numero de filas afectadas</returns>
        public int borrarPersonaPorID_BL(int id)
        {
            int filas;
            clsManejadoraPersona_DAL manejadora = new clsManejadoraPersona_DAL();

            filas = manejadora.borrarPersonaPorID_DAL(id);

            return filas;
        }

        /// <summary>
        /// Función que recibe un objeto clsPersona y la inserta en la BBDD, devuelve el numero de filas afectadas
        /// </summary>
        /// <param name="oPersona"></param>
        /// <returns>devuelve un entero con el numero de filas afectadas</returns>
        public int insertarPersona_BL(clsPersona oPersona)
        {
            int filas;
            clsManejadoraPersona_DAL manejadora = new clsManejadoraPersona_DAL();

            filas = manejadora.insertarPersona_DAL(oPersona);

            return filas;
        }

        /// <summary>
        /// Función que recibe un objeto clsPersona con los datos de una persona de la BBDD modificada y la actualiza, devuelve el numero de filas afectadas
        /// </summary>
        /// <param name="oPersona"></param>
        /// <returns>devuelve un entero con el numero de filas afectadas</returns>
        public int editarPersona_BL(clsPersona oPersona)
        {
            int filas;
            clsManejadoraPersona_DAL manejadora = new clsManejadoraPersona_DAL();

            filas = manejadora.editarPersona_DAL(oPersona);

            return filas;
        }



    }
}

