import Realm from 'realm';
import User from './User';
import Client from './Client';
import Session from './Session';
import Form from './Form';
import Guardian from './Guardian';

export default new Realm({ schema: [User, Client, Session, Form, Guardian], schemaVersion: 1 });

