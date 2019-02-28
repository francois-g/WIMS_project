using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WimsApiMKI.Models
{
    public class Auction
    {
        private int _id;
        private WimsUser _twitcher;
        private WimsUser _user;
        private int? _minAuction;
        private int? _maxAuction;
        private int _currentAuction;
        private DateTime? _auctionDate;
        private bool _auctionValidation;
        private int _idPrice;
        private PriceToWin _auctionPrice;
        private bool _active;

        public Auction()
        {
            Twitcher = new WimsUser();
            User = new WimsUser();
            AuctionPrice = new PriceToWin(_idPrice);
            AuctionDate = DateTime.Now;
        }

        public Auction(int value)
        {
            CurrentAuction = value;
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
        
        public WimsUser User
        {
            get { return _user; }
            set { _user = value; }
        }

        public int? MinAuction
        {
            get { return _minAuction; }
            set { _minAuction = value; }
        }

        public int? MaxAuction
        {
            get { return _maxAuction; }
            set { _maxAuction = value; }
        }
       
       public DateTime? AuctionDate
        {
            get { return _auctionDate; }
            set { _auctionDate = value; }
        }

        public int CurrentAuction
        {
            get { return _currentAuction; }
            set { _currentAuction = value; }
        }

        public bool AuctionValidation
        {
            get { return _auctionValidation; }
            set { _auctionValidation = value; }
        }

        public int IdPrice
        {
            get { return _idPrice; }
            set { _idPrice = value; }
        }

        public PriceToWin AuctionPrice
        {
            get { return _auctionPrice; }
            set { _auctionPrice = value; }
        }

        public bool Active
        {
            get { return _active; }
            set { _active = value; }
        }
        #endregion

    }
}
