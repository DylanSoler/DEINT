using _17_CRUDPersonasUWP_API_DAL.Conexion;
using _17_CRUDPersonasUWP_API_Entidades;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;

namespace _17_CRUDPersonasUWP_API_DAL.Manejadora
{
    public class clsManejadoraPersonasDAL
    {

        /// <summary>
        /// Metodo que actualiza una persona
        /// </summary>
        /// <param name="persona">Los datos nuevos de la persona que se va a actualizar</param>
        /// <returns>int filas con el numero de filas afectadas</returns>
        public async Task<int> actualizarPersonaDAL(clsPersona persona)
        {
            HttpClient client = new HttpClient();
            clsUriBase uribase = new clsUriBase();
            String ruta = uribase.getUriBaseApi();
            String datos;
            HttpContent contenido;
            Uri miUri = new Uri($"{ruta}/Personas/{persona.idPersona}");
            int filas = 0;

            HttpResponseMessage response = new HttpResponseMessage();

            try
            {
                datos = JsonConvert.SerializeObject(persona);

                contenido = new StringContent(datos, System.Text.Encoding.UTF8, "application/json");
                response = await client.PutAsync(miUri, contenido);
            }
            catch (Exception ex)
            {
                throw ex;
            }

            if (response.IsSuccessStatusCode)
            {
                filas = 1;
            }

            return filas;

        }

        /// <summary>
        /// Metodo que inserta una persona
        /// </summary>
        /// <param name="persona">persona que se va a insertar</param>
        /// <returns>int filas con el numero de filas afectadas</returns>
        public async Task<int> insertarPersonaDAL(clsPersona persona)
        {
            HttpClient client = new HttpClient();
            clsUriBase uribase = new clsUriBase();
            String ruta = uribase.getUriBaseApi();
            String datos;
            HttpContent contenido;
            Uri miUri = new Uri($"{ruta}/Personas");
            int filas = 0;

            HttpResponseMessage response = new HttpResponseMessage();

            try
            {
                datos = JsonConvert.SerializeObject(persona);

                contenido = new StringContent(datos, System.Text.Encoding.UTF8, "application/json");
                response = await client.PostAsync(miUri, contenido);
            }
            catch (Exception ex)
            {
                throw ex;
            }

            if (response.IsSuccessStatusCode)
            {
                filas = 1;
            }

            return filas;

        }

        /// <summary>
        /// Metodo que elimina una persona segun el id
        /// </summary>
        /// <param name="id">id de la persona a eliminar</param>
        /// <returns>numero de filas afectadas</returns>
        public async Task<int> eliminarPersonaDAL(int id)
        {
            HttpClient client = new HttpClient();
            clsUriBase uribase = new clsUriBase();
            String ruta = uribase.getUriBaseApi();
            Uri miUri = new Uri($"{ruta}/Personas/{id}");
            int filas = 0;

            HttpResponseMessage response = new HttpResponseMessage();

            try
            {
                response = await client.DeleteAsync(miUri);
            }
            catch (Exception ex)
            {
                throw ex;
            }

            if (response.IsSuccessStatusCode)
            {
                filas = 1;
            }

            return filas;
        }

        /// <summary>
        /// Metodo que devuelve una persona dado un id
        /// </summary>
        /// <returns>List de clsPersona</returns>
        public async Task<clsPersona> PersonaPorIDDAL(int id)
        {
            clsUriBase uribase = new clsUriBase();
            String ruta = uribase.getUriBaseApi();

            clsPersona persona = new clsPersona();

            HttpClient client = new HttpClient();

            HttpResponseMessage response = new HttpResponseMessage();

            try
            {
                response = await client.GetAsync($"{ruta}/Personas/{id}");
            }
            catch (Exception ex)
            {
                throw ex;
            }

            if (response.IsSuccessStatusCode)
            {
                string pers = await response.Content.ReadAsStringAsync();
                persona = JsonConvert.DeserializeObject<clsPersona>(pers);

            }
            else
            {
                //TODO
            }

            return persona;
        }

    }
}
