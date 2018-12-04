
using _14_CRUDPersonasUWP_DAL.Conexion;
using _14_CRUDPersonasUWP_Entidades;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace _14_CRUDPersonasUWP_DAL.Listados
{
    /// <summary>
    /// Clase que contiene distintas funciones que devuelven diferentes listados de personas
    /// </summary>
    public class clsListadoPersonas_DAL
    {
        /// <summary>
        /// Función que devuelve un listado completo de personas, vacia si no hay datos o si ha habido un error
        /// </summary>
        /// <returns>List de clsPersona</returns>
        public List<clsPersona> listadoCompletoPersonas_DAL() {

            List<clsPersona> lista = new List<clsPersona>();

            SqlConnection miConexion = new SqlConnection();
            SqlCommand miComando = new SqlCommand();
            SqlDataReader miLector = null;
            clsPersona oPersona;
            clsMyConnection gestConexion = new clsMyConnection();

            try //no obligatorio porque lo controlamos en la clase clsMyConnection
            {
                miConexion = gestConexion.getConnection();
                miComando.CommandText = "SELECT * FROM personas";
                miComando.Connection = miConexion;
                miLector = miComando.ExecuteReader();
                //ExecuteScalar devuelve la primera fila (cuando hacemos count se usa)
                //ExecuteNonQuery (update, delete, insert)
                //ExecuteReader (consultas)

                //Comprobar si el lector tiene filas, y en caso afirmativo recorrer
                if (miLector.HasRows)
                {
                    while (miLector.Read())
                    {
                        oPersona = new clsPersona();
                        oPersona.idPersona = (int)miLector["IDPersona"];
                        oPersona.nombre = (string)miLector["Nombre"];
                        oPersona.apellidos = (string)miLector["Apellidos"];
                        oPersona.fechaNacimiento = (DateTime)miLector["Fecha_Nacimiento"];
                        oPersona.direccion = (string)miLector["Direccion"];
                        oPersona.telefono = (string)miLector["Telefono"];
                        oPersona.idDepartamento = (int)miLector["IDDepartamento"];
                        lista.Add(oPersona);
                    }
                }
            }
            catch (SqlException exSql)
            {
                throw exSql;
            }
            finally {
                miLector.Close();
                gestConexion.closeConnection(ref miConexion);
            }


            return lista;
        }
    }
}
