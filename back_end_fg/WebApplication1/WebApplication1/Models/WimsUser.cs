﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Collections;

namespace WimsApiMKI.Models
{
    public class WimsUser
    {
        private int _id;
        private string _firstname;
        private string _lastname;
        private string _pseudo;
        private string _pswd;
        private string _email;
        private string _twitchLink;
        private string _pseudoTwitch;
        private int _balance;
        private bool _conditionAccepted;
        private int? _currencyId;
        private Currency _currency;
        private string _avatar;
        private bool _active;
<<<<<<< HEAD
        private int _role;
        //private Role _role;


        public WimsUser()
        {
            Currency = new Currency();
            //Role = new Role();
<<<<<<< HEAD
            Role = 2;
=======
            Role = 1;
>>>>>>> 0b2a35c742958a6187cef42269e483e385693401
=======
        //private Role _role;
        private int _roleId;

        public WimsUser()
        {
            this.Currency = new Currency();
            this.RoleId = 1;
>>>>>>> a88fc40a863289e4577dc4636eec791cd87aaec6
        }

        #region GetSet
        public int Id
        {
            get { return _id; }
            set { _id = value; }
        }

        public string Firstname
        {
            get { return _firstname; }
            set { _firstname = value; }
        }

        public string Lastname
        {
            get { return _lastname; }
            set { _lastname = value; }
        }
        
        public string Pseudo
        {
            get { return _pseudo; }
            set { _pseudo = value; }
        }

        public string Pswd
        {
            get { return _pswd; }
            set { _pswd = value; }
        }

        public string Email
        {
            get { return _email; }
            set { _email = value; }
        }

        public string TwitchLink
        {
            get { return _twitchLink; }
            set { _twitchLink = value; }
        }

        public string PseudoTwitch
        {
            get { return _pseudoTwitch; }
            set { _pseudoTwitch = value; }
        }

        public int Balance
        {
            get { return _balance; }
            set { _balance = value; }
        }

        public bool ConditionAccepted
        {
            get { return _conditionAccepted; }
            set { _conditionAccepted = value; }
        }

        public int? CurrencyId
        {
            get { return _currencyId; }
            set { _currencyId = value; }
        }

        public Currency Currency
        {
            get { return _currency; }
            set { _currency = value; }
        }

        public string Avatar
        {
            get { return _avatar; }
            set { _avatar = value; }
        }

        public bool Active
        {
            get { return _active; }
            set { _active = value; }
        }

        public int RoleId
        {
            get { return _roleId; }
            set { _roleId = value; }
        }
        #endregion

    }
}
