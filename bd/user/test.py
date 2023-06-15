# https://pythontic.com/database/postgresql/create%20database
# https://www.psycopg.org/docs/errors.html
import unittest
import psycopg2
from psycopg2.extensions import ISOLATION_LEVEL_AUTOCOMMIT
from psycopg2.errors import UniqueViolation
from psycopg2.errors import NotNullViolation
from psycopg2.errors import StringDataRightTruncation
from psycopg2.errors import ForeignKeyViolation

class TestDb(unittest.TestCase):
    def setUp(self):
        # Connexion à l'instance postgres
        connInstance = psycopg2.connect(user='postgres', password='password', host='postgres', port='5432')
        connInstance.set_isolation_level(ISOLATION_LEVEL_AUTOCOMMIT)
        cursorInstance = connInstance.cursor()
        # Création bd
        cursorInstance.execute('create database dbtest;')
        # Connexion bd
        connDB = psycopg2.connect(dbname='dbtest', user='postgres', password='password', host='postgres', port='5432')
        connDB.autocommit=True
        connInstance.autocommit=True
        cursorDB = connDB.cursor()
        # Création schema
        f=open('initTest.sql','r')
        cursorDB.execute(f.read())
        f.close()
        cursorDB.execute("INSERT INTO Users VALUES ('1','password','email','username','token');")
        cursorDB.execute("INSERT INTO Users VALUES ('6','password6','email6','username6','token6');")
        cursorDB.execute("INSERT INTO Users VALUES ('7','password7','email7','username7','token7');")
        cursorDB.execute("INSERT INTO House VALUES ('1','housename','link');")
        cursorDB.execute("INSERT INTO House VALUES ('6','housename6','link6');")
        cursorDB.execute("INSERT INTO House VALUES ('5','housename5','link5');")
        cursorDB.execute("INSERT INTO Device VALUES ('1');")
        cursorDB.execute("INSERT INTO Device VALUES ('5');")
        cursorDB.execute("INSERT INTO Device VALUES ('7');")
        cursorDB.execute("INSERT INTO has VALUES ('1','1',True);")
        cursorDB.execute("INSERT INTO isComposedBy VALUES ('1','1');")
        cursorDB.execute("INSERT INTO uses VALUES ('1','1',False);")
        # Attributs
        self.connInstance=connInstance
        self.connDB=connDB
        self.cursorDB=cursorDB
        self.cursorInstance=cursorInstance

############################ TEST CONSTRAINT ############################
    # TEST CONTRAINTE UNIQUE   
    def test_user_id_unique(self):
        with self.assertRaises(UniqueViolation) :
            self.cursorDB.execute("INSERT INTO Users VALUES ('1','password2','email2','username2','token2');")

    def test_user_name_unique(self):
        with self.assertRaises(UniqueViolation):
            self.cursorDB.execute("INSERT INTO Users VALUES ('2','password2','email2','username','token2');")

    def test_user_mail_unique(self):
        with self.assertRaises(UniqueViolation):
            self.cursorDB.execute("INSERT INTO Users VALUES ('2','password2','email','username2','token2');")

    def test_user_token_unique(self):
        with self.assertRaises(UniqueViolation):
            self.cursorDB.execute("INSERT INTO Users VALUES ('2','password2','email2','username2','token');")

    def test_house_id_unique(self):
        with self.assertRaises(UniqueViolation) :
            self.cursorDB.execute("INSERT INTO House VALUES ('1','housename2','link2');")

    def test_house_link_unique(self):
        with self.assertRaises(UniqueViolation):
            self.cursorDB.execute("INSERT INTO House VALUES ('2','housename','link');")

    def test_device_id_unique(self):
        with self.assertRaises(UniqueViolation):
            self.cursorDB.execute("INSERT INTO Device VALUES ('1');")

    def test_has_id_user_id_house_unique(self):
        with self.assertRaises(UniqueViolation):
            self.cursorDB.execute("INSERT INTO has VALUES ('1','1',False);")

    def test_isComposedBy_id_house_id_device_unique(self):
        with self.assertRaises(UniqueViolation):
            self.cursorDB.execute("INSERT INTO isComposedBy VALUES ('1','1');")

    def test_uses_id_user_id_device_unique(self):
        with self.assertRaises(UniqueViolation):
            self.cursorDB.execute("INSERT INTO uses VALUES ('1','1', True);")


    # TEST CONSTRAINT NOT NULL
    def test_user_id_not_null(self):
        with self.assertRaises(NotNullViolation) :
            self.cursorDB.execute("INSERT INTO Users (userpassword,email,username,token) VALUES ('abcde','emails','theo','frefeefr');")

    def test_user_name_not_null(self):
        with self.assertRaises(NotNullViolation):
            self.cursorDB.execute("INSERT INTO Users (idUser,email,username,token) VALUES ('2','emaile','thea','frifeefr');")

    def test_user_mail_not_null(self):
        with self.assertRaises(NotNullViolation):
            self.cursorDB.execute("INSERT INTO Users (idUser,userpassword,username,token) VALUES ('2','abcdef','theo','frifeefr');")

    def test_user_password_not_null(self):
        with self.assertRaises(NotNullViolation):
            self.cursorDB.execute("INSERT INTO Users (idUser,userpassword,email,token) VALUES ('2','abcdef','emaile','frafeefr');")

    def test_house_id_not_null(self):
        with self.assertRaises(NotNullViolation):
            self.cursorDB.execute("INSERT INTO House (housename,link) VALUES ('housename2','link2');")

    def test_house_link_not_null(self):
        with self.assertRaises(NotNullViolation):
            self.cursorDB.execute("INSERT INTO House (idHouse,housename) VALUES ('2','housename2');")

    def test_device_id_not_null(self):
        with self.assertRaises(NotNullViolation):
            self.cursorDB.execute("INSERT INTO Device (idDevice) VALUES (NULL);")

    def test_has_id_user_not_null(self):
        with self.assertRaises(NotNullViolation):
            self.cursorDB.execute("INSERT INTO has (idHouse,isMain) VALUES ('1',True);")

    def test_has_id_house_not_null(self):
        with self.assertRaises(NotNullViolation):
            self.cursorDB.execute("INSERT INTO has (idUser, isMain) VALUES ('1',False);")

    def test_has_id_house_not_null(self):
        with self.assertRaises(NotNullViolation):
            self.cursorDB.execute("INSERT INTO has (idUser, idHouse) VALUES ('1','1');")

    def test_isComposedBy_id_house_not_null(self):
        with self.assertRaises(NotNullViolation):
            self.cursorDB.execute("INSERT INTO isComposedBy (idDevice) VALUES ('1');")

    def test_isComposedBy_id_device_not_null(self):
        with self.assertRaises(NotNullViolation):
            self.cursorDB.execute("INSERT INTO isComposedBy (idHouse) VALUES ('1');")

    def test_uses_id_user_not_null(self):
        with self.assertRaises(NotNullViolation):
            self.cursorDB.execute("INSERT INTO uses (idDevice,rightToWrite) VALUES ('1', True);")

    def test_uses_id_device_not_null(self):
        with self.assertRaises(NotNullViolation):
            self.cursorDB.execute("INSERT INTO uses (idUser,rightToWrite) VALUES ('1',False);")

    def test_uses_right_to_write_not_null(self):
        with self.assertRaises(NotNullViolation):
            self.cursorDB.execute("INSERT INTO uses (idUser,idDevice) VALUES ('1','1');")

    # TEST CONSTRAINT TYPE
    # Test len
    def test_house_id_house_len(self):
        with self.assertRaises(StringDataRightTruncation):
            self.cursorDB.execute("INSERT INTO House (idHouse,housename,link) VALUES ('123456789111121334567890987654321234567890987654321','2','link2');")

    def test_house_housename_len(self):
        with self.assertRaises(StringDataRightTruncation):
            self.cursorDB.execute("INSERT INTO House (idHouse,housename,link) VALUES ('2','123456789111121334567890987654321234567890987654321','link2');")
    
    def test_house_link_len(self):
        with self.assertRaises(StringDataRightTruncation):
            self.cursorDB.execute("INSERT INTO House (idHouse,housename,link) VALUES ('2','2','123456789111121334567890987654321234567890987654321');")
    
    def test_device_id_device_len(self):
        with self.assertRaises(StringDataRightTruncation):
            self.cursorDB.execute("INSERT INTO Device (idDevice) VALUES ('123456789111121334567890987654321234567890987654321');")

    def test_users_id_user_len(self):
        with self.assertRaises(StringDataRightTruncation):
            self.cursorDB.execute("INSERT INTO Users (idUser,userpassword,email,username,token) VALUES ('123456789111121334567890987654321234567890987654321','password2','email2','username2','token2');")

    def test_users_password_len(self):
        with self.assertRaises(StringDataRightTruncation):
            self.cursorDB.execute("INSERT INTO Users (idUser,userpassword,email,username,token) VALUES ('2','123456789111121334567890987654321234567890987654321','email2','username2','token2');")

    def test_users_mail_len(self):
        with self.assertRaises(StringDataRightTruncation):
            self.cursorDB.execute("INSERT INTO Users (idUser,userpassword,email,username,token) VALUES ('2','password2','123456789111121334567890987654321234567890987654321','username2','token2');")

    def test_users_username_len(self):
        with self.assertRaises(StringDataRightTruncation):
            self.cursorDB.execute("INSERT INTO Users (idUser,userpassword,email,username,token) VALUES ('2','password2','email2','123456789111121334567890987654321234567890987654321','token2');")

    def test_users_token_len(self):
        with self.assertRaises(StringDataRightTruncation):
            self.cursorDB.execute("INSERT INTO Users (idUser,userpassword,email,username,token) VALUES ('2','password2','email2','username2','123456789111121334567890987654321234567890987654321');")

    def test_isComposedBy_idHouse_len(self):
        with self.assertRaises(StringDataRightTruncation):
            self.cursorDB.execute("INSERT INTO isComposedBy (idHouse,idDevice) VALUES ('234567898765432456789876543212356789064567811232578','2');")

    def test_isComposedBy_id_device_len(self):
        with self.assertRaises(StringDataRightTruncation):
            self.cursorDB.execute("INSERT INTO isComposedBy (idHouse,idDevice) VALUES ('2','2234567898765432456789876543212356789064567811232578');")

    def test_has_id_user_len(self):
        with self.assertRaises(StringDataRightTruncation):
            self.cursorDB.execute("INSERT INTO has (idUser,idHouse,isMain) VALUES ('2234567898765432456789876543212356789064567811232578','2',False);")

    def test_has_id_house_len(self):
        with self.assertRaises(StringDataRightTruncation):
            self.cursorDB.execute("INSERT INTO has (idUser,idHouse,isMain) VALUES ('2','2234567898765432456789876543212356789064567811232578',True);")

    def test_uses_id_user_len(self):
        with self.assertRaises(StringDataRightTruncation):
            self.cursorDB.execute("INSERT INTO uses (idUser,idDevice,rightToWrite) VALUES ('2234567898765432456789876543212356789064567811232578','2',True);")

    def test_uses_id_device_len(self):
        with self.assertRaises(StringDataRightTruncation):
            self.cursorDB.execute("INSERT INTO uses (idUser,idDevice,rightToWrite) VALUES ('2','2234567898765432456789876543212356789064567811232578',True);")

    # Test type NE FONCTIONNE PAS !!!!!!!!
    def test_house_id_house_type(self):
        #with self.assertRaises(NotNullViolation):
        self.cursorDB.execute("INSERT INTO House (idHouse,housename,link) VALUES (1.5,'2','link2');")

    # TEST FOREIGN KEY
    def test_has_fk_idUser(self):
        with self.assertRaises(ForeignKeyViolation):
            self.cursorDB.execute("INSERT INTO has (idUser,idHouse,isMain) VALUES ('4','1',True);")

    def test_has_fk_idHouse(self):
        with self.assertRaises(ForeignKeyViolation):
            self.cursorDB.execute("INSERT INTO has (idUser,idHouse,isMain) VALUES ('1','4',True);")

    def test_isComposedBy_fk_idHouse(self):
        with self.assertRaises(ForeignKeyViolation):
            self.cursorDB.execute("INSERT INTO isComposedBy (idHouse,idDevice) VALUES ('4','1');")

    def test_isComposedBy_fk_idDevice(self):
        with self.assertRaises(ForeignKeyViolation):
            self.cursorDB.execute("INSERT INTO isComposedBy (idHouse,idDevice) VALUES ('1','4');")

    def test_uses_fk_idUser(self):
        with self.assertRaises(ForeignKeyViolation):
            self.cursorDB.execute("INSERT INTO uses (idUser,idDevice,rightToWrite) VALUES ('4','1',True);")

    def test_uses_fk_idDevice(self):
        with self.assertRaises(ForeignKeyViolation):
            self.cursorDB.execute("INSERT INTO uses (idUser,idDevice,rightToWrite) VALUES ('1','4',True);")


############################ TEST INTEGRITE ############################
#Suppression user associé ou device associé etc...
#On cascade quoi
    def test_isComposedBy_integrity_fk(self):
        self.cursorDB.execute("DELETE FROM Users WHERE idUser='6';")


    def tearDown(self):
        # Delete database test
        # Close conn & cursor DB
        self.cursorDB.close()
        self.connDB.close()
        # Drop database
        self.cursorInstance.execute('DROP DATABASE dbtest;')
        # Close conn et cursor instance
        self.cursorInstance.close()
        self.connInstance.close()

unittest.main()
