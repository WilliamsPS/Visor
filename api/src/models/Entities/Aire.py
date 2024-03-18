
import datetime

class Aire():
    # Mapear la base de datos thin001
    def __init__(self, recvtime=None, attrname=None, attrvalue=None):
        if isinstance(recvtime, str):
            # Ajusta el formato para tu fecha y hora
            recvtime = datetime.datetime.strptime(recvtime, '%Y-%m-%d %H:%M')
        self.recvtime = recvtime
        self.attrname = attrname
        self.attrvalue = attrvalue

    # Convertido a Json
    def to_json(self):
        if self.recvtime:
            formatted_date = self.recvtime.strftime('%Y-%m-%d %H:%M')
        else:
            formatted_date = None

        # Retornando un diccionario en formato Json
        return {
            'recvtime': formatted_date,
            'attrname': self.attrname,
            'attrvalue': self.attrvalue
        }
