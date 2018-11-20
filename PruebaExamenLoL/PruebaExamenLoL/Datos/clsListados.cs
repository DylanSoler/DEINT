using PruebaExamenLoL.Models;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PruebaExamenLoL.Datos
{
    public class clsListados
    {

        public List<clsPersonaje> listadoPersonajesPorCategoria(int idCategoria) {

            List<clsPersonaje> listado = new List<clsPersonaje>();

            SqlConnection miConexion = new SqlConnection();
            SqlCommand miComando = new SqlCommand();
            SqlDataReader miLector = null;
            clsPersonaje oPersonaje;
            clsMyConnection gestConexion = new clsMyConnection();

            try
            {
                miConexion = gestConexion.getConnection();
                miComando.CommandText = "SELECT * FROM Personajes WHERE idCategoria = @idCategoria";
                miComando.Parameters.Add("@idCategoria", System.Data.SqlDbType.Int).Value=idCategoria;
                miComando.Connection = miConexion;
                miLector = miComando.ExecuteReader();

                if (miLector.HasRows)
                {
                    while (miLector.Read())
                    {
                        oPersonaje = new clsPersonaje();
                        oPersonaje.idPersonaje = (int)miLector["idPersonaje"];
                        oPersonaje.nombre = (string)miLector["nombre"];
                        oPersonaje.alias = (string)miLector["alias"];
                        oPersonaje.vida = (double)miLector["vida"];
                        oPersonaje.regeneracion = (double)miLector["regeneracion"];
                        oPersonaje.danno = (double)miLector["danno"];
                        oPersonaje.armadura = (double)miLector["armadura"];
                        oPersonaje.velAtaque = (double)miLector["velAtaque"];
                        oPersonaje.resistencia = (double)miLector["resistencia"];
                        oPersonaje.velMovimiento = (double)miLector["velMovimiento"];
                        oPersonaje.idCategoria = (int)miLector["idCategoria"];
                        listado.Add(oPersonaje);
                    }
                }
            }
            catch (SqlException exSql)
            {
                throw exSql;
            }
            finally
            {
                miLector.Close();
                gestConexion.closeConnection(ref miConexion);
            }


            return listado;
        }


        public List<clsCategoria> listadoCompletoCategorias()
        {

            List<clsCategoria> listado = new List<clsCategoria>();
            SqlConnection miConexion = new SqlConnection();
            SqlCommand miComando = new SqlCommand();
            SqlDataReader miLector = null;
            clsCategoria oCategoria;
            clsMyConnection gestConexion = new clsMyConnection();

            try
            {
                miConexion = gestConexion.getConnection();
                miComando.CommandText = "SELECT * FROM Categorias";
                miComando.Connection = miConexion;
                miLector = miComando.ExecuteReader();

                //si mi lector tiene filas, recorremos y añadimos al listado cada categoria
                if (miLector.HasRows)
                {
                    while (miLector.Read())
                    {
                        oCategoria = new clsCategoria();
                        oCategoria.idCategoria = (int)miLector["idCategoria"];
                        oCategoria.nombreCategoria = (string)miLector["nombreCategoria"];
                        //añadir al listado
                        listado.Add(oCategoria);
                    }
                }
            }
            catch (SqlException exSql)
            {
                throw exSql;
            }
            finally
            {
                miLector.Close();
                gestConexion.closeConnection(ref miConexion);
            }


            return listado;
        }

    }
}
