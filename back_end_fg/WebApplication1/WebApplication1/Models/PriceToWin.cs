﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WimsApiMKI.Models
{
    public class PriceToWin
    {
        private int _id;
        private WimsUser _twitcher;
        private DateTime _offerEnd;
        private Game _game;
        private int _auctionStartValue;
        private string _description;
        private bool _active;

        public PriceToWin(int value)
        {
            Id = value;
        }

        public PriceToWin()
        {
            Twitcher = new WimsUser();
            OfferEnd = new DateTime();
            Game = new Game();
        }

        #region GetSet
        public int Id
        {
            get { return _id; }
            set { _id = value; }
        }

        public WimsUser Twitcher
        {
            get { return _twitcher; }
            set { _twitcher = value; }
        }

        public DateTime OfferEnd
        {
            get { return _offerEnd; }
            set { _offerEnd = value; }
        }

        public Game Game
        {
            get { return _game; }
            set { _game = value; }
        }

        public int AuctionStartValue
        {
            get { return _auctionStartValue; }
            set { _auctionStartValue = value; }
        }

        public string Description
        {
            get { return _description; }
            set { _description = value; }
        }

        public bool Active
        {
            get { return _active; }
            set { _active = value; }
        }
        #endregion
    }
}
