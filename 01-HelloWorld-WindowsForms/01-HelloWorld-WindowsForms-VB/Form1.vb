Imports _01_HelloWorld_WindowsForms_CSharp
Public Class Form1

    Private Sub Button1_Click(sender As Object, e As EventArgs) Handles Button1.Click

        'Dim nombre As String
        'nombre = Me.TextBox1.Text
        'MessageBox.Show("Hola " + nombre)

        Dim oPersona As New clsPersona
        oPersona.Nombre = "Dylan"
        oPersona.Apellidos = "Soler"
        MessageBox.Show("Soy un objeto de C# " + oPersona.Nombre + " " + oPersona.Apellidos)


    End Sub


End Class
