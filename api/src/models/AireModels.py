from database.db import get_connection
from .Entities.Aire import Aire
from datetime import datetime, timedelta

class AireModel():
    
    @classmethod
    def get_aire(self):
        try:
            connection = get_connection()
            aires=[]

            with connection.cursor() as cursor:
                cursor.execute(
                    """
                    SELECT
                        TO_CHAR(TO_TIMESTAMP(recvtime, 'YYYY-MM-DD HH24:MI')::timestamp - INTERVAL '5 hours','MM/YYYY') AS fecha,
                        attrname,
                        ROUND(AVG(CASE WHEN attrname IN ('temperatura', 'humedad', 'resistenciaGas', 'presion') 
                                    THEN CAST(attrvalue AS NUMERIC) ELSE NULL END), 1) AS avg_value
                    FROM
                        openiot.calidadaire_urn_ngsi_thing_001_thing
                    WHERE
                        attrname IN ('temperatura', 'humedad', 'resistenciaGas', 'presion') 
                        AND attrname <> 'TimeInstant' 
                    GROUP BY fecha, attrname
                    ORDER BY fecha, attrname;
                    """
                )
                resultset = cursor.fetchall()

                for row in resultset:
                    #fecha = datetime.strptime(row[0], '%Y-%m-%d').strftime('%Y-%m-%d %H:%M')
                    fecha = datetime.strptime(row[0], '%m/%Y').strftime('%Y-%m-%d %H:%M')
                    aire = Aire(fecha, row[1], row[2])
                    aires.append(aire.to_json())

            connection.close()

            return aires

        except Exception as ex:
            raise Exception(ex) 


    @classmethod
    def get_aire_filtro_thin001(cls, unit='hour', interval=1):
        try:
            connection = get_connection()
            aires = []

            with connection.cursor() as cursor:
                # Determinar la cadena de formato según la unidad de tiempo proporcionada
                if unit == 'minuto':
                    date_format = 'DD/MM/YYYY HH24:MI'
                    dato_format = '%d/%m/%Y %H:%M'
                    interval_str = f'{interval} minutes'
                elif unit == 'hora':
                    date_format = 'DD/MM/YYYY HH24:00'
                    dato_format = '%d/%m/%Y %H:%M'
                    interval_str = f'{interval} hours'
                elif unit == 'dia':
                    date_format = 'DD/MM/YYYY'
                    dato_format = '%d/%m/%Y'
                    interval_str = f'{interval} days'
                elif unit == 'mes':
                    date_format = 'MM/YYYY'
                    dato_format = '%m/%Y'
                    interval_str = f'{interval} months'
                elif unit == 'anio':
                    date_format = 'YYYY'
                    dato_format = '%Y'
                    interval_str = f'{interval} years'
                else:
                    raise ValueError("Unidad de tiempo no válida")

                cursor.execute(
                    f"""
                    SELECT
                        TO_CHAR(TO_TIMESTAMP(recvtime, 'YYYY-MM-DD HH24:MI')::timestamp - INTERVAL '5 hours', '{date_format}') AS fecha,
                        attrname,
                        ROUND(AVG(CASE WHEN attrname IN ('temperatura', 'humedad', 'resistenciaGas', 'presion') 
                                    THEN CAST(attrvalue AS NUMERIC) ELSE NULL END), 1) AS avg_value
                    FROM
                        openiot.calidadaire_urn_ngsi_thing_001_thing
                    WHERE
                        attrname IN ('temperatura', 'humedad', 'resistenciaGas', 'presion') 
                        AND attrname <> 'TimeInstant' 
                    GROUP BY fecha, attrname
                    ORDER BY fecha, attrname;
                    """
                )
                resultset = cursor.fetchall()

                for row in resultset:
                    # Analizar la cadena de fecha según el formato definido
                    fecha = datetime.strptime(row[0], dato_format).strftime('%Y-%m-%d %H:%M')
                    aire = Aire(fecha, row[1], row[2])
                    aires.append(aire.to_json())

            connection.close()

            return aires

        except Exception as ex:
            raise Exception(ex)
        
