import Realm from 'realm';
import User from './User';
import Client from './Client';
import Session from './Session';
import Form from './Form';
import Guardian from './Guardian';
import ECBI from './session/ECBI';
import DOH from './session/DOH';

export default new Realm({ schema: [User, Client, Session, Form, Guardian, ECBI, DOH], schemaVersion: 6 });

