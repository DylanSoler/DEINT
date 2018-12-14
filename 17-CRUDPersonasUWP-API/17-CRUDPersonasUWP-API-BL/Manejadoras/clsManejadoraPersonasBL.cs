using _17_CRUDPersonasUWP_API_DAL.Conexion;
using _17_CRUDPersonasUWP_API_DAL.Manejadora;
using _17_CRUDPersonasUWP_API_Entidades;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;

namespace _17_CRUDPersonasUWP_API_BL.Manejadoras
{
    public class clsManejadoraPersonasBL
    {

        /// <summary>
        /// Metodo que llama a la DAL y actualiza una persona
        /// </summary>
        /// <param name="persona">Los datos nuevos de la persona que se va a actualizar</param>
        /// <returns>int filas con el numero de filas afectadas</returns>
        public async Task<int> actualizarPersonaBL(clsPersona persona)
        {
            int filas = 0;
            clsManejadoraPersonasDAL gest = new clsManejadoraPersonasDAL();

            filas = await gest.actualizarPersonaDAL(persona);

            return filas;

        }


        /// <summary>
        /// Metodo que llama a la DAL inserta una persona
        /// </summary>
        /// <param name="persona">persona que se va a insertar</param>
        /// <returns>int filas con el numero de filas afectadas</returns>
        public async Task<int> insertarPersonaBL(clsPersona persona)
        {
            int filas = 0;
            clsManejadoraPersonasDAL gest = new clsManejadoraPersonasDAL();

            filas = await gest.insertarPersonaDAL(persona);

            return filas;

        }


        /// <summary>
        /// Metodo que elimina una persona segun el id
        /// </summary>
        /// <param name="id">id de la persona a eliminar</param>
        /// <returns>numero de filas afectadas</returns>
        public async Task<int> eliminarPersonaBL(int id)
        {
            int filas = 0;
            clsManejadoraPersonasDAL gest = new clsManejadoraPersonasDAL();

            filas = await gest.eliminarPersonaDAL(id);

            return filas;
        }

    }
}
