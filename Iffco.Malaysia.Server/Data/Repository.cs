﻿using Mauritius.EInvoicing.Server.Data.Entities;
using Microsoft.EntityFrameworkCore;

namespace Mauritius.EInvoicing.Server.Data
{
    public class Repository : DbContext
    {
        public Repository(DbContextOptions<Repository> options) : base(options)
        {
        }
        public DbSet<User> Users { get; set; }
    }
}
