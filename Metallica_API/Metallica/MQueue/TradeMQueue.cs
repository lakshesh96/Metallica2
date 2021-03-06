﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Messaging;
using Metallica.Models;
using Metallica.Custom_Classes;

namespace Metallica.MQueue
{
    public class TradeMQueue
    {
        private string TradeQueueName = @".\Private$\GenericTrade"; 
        public Boolean SendMessage(TradeQueueMessage<Trade> tradeMessage)
            {
                MessageQueue messageQueue = null;
                if (!MessageQueue.Exists(TradeQueueName))
                    messageQueue = MessageQueue.Create(TradeQueueName);
                else
                    messageQueue = new MessageQueue(TradeQueueName);
                try
                {
                    messageQueue.Formatter = new XmlMessageFormatter(new Type[] { typeof(TradeQueueMessage<Trade>) });
                    messageQueue.Send(tradeMessage);
                }
                catch (Exception e)
                {
                    return false;
                }
                finally
                {
                    messageQueue.Close();
                }
            return true;
            } //Send TradeMessage to Queue


            public TradeQueueMessage<Trade> ReceiveMessage()
            {
                if (!MessageQueue.Exists(TradeQueueName))
                    return null;
                MessageQueue messageQueue = new MessageQueue(TradeQueueName);
                TradeQueueMessage<Trade> trade = null;
                try
                {
                    messageQueue.Formatter = new XmlMessageFormatter(new Type[] { typeof(TradeQueueMessage<Trade>) });
                    trade = (TradeQueueMessage<Trade>)messageQueue.Receive().Body;
                }
                catch {
                    return null;
                }
                finally
                {
                    messageQueue.Close();
                }
                return trade;
            }   // Recieve Trade Message From Queue
    }
}