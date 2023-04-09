﻿using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using VSTU.Digital.Messenger.Domain.Entities;

namespace VSTU.Digital.Messenger.Infrastructure.Data.Configuration;

public class UserConfiguration : IEntityTypeConfiguration<User>
{
    public void Configure(EntityTypeBuilder<User> builder)
    {
        builder.HasKey(u => u.Id);
        builder.Property(u => u.Username).HasMaxLength(50).IsRequired();
        builder.Property(u => u.FirstName).HasMaxLength(50).IsRequired();
        builder.Property(u => u.LastName).HasMaxLength(50).IsRequired();
        builder.Property(u => u.Patronymic).HasMaxLength(50);
        builder.Property(u => u.Password).HasMaxLength(50).IsRequired();
        builder.Property(u => u.GroupName).HasMaxLength(50);

        builder.HasIndex(u => u.Username).IsUnique();
        
        builder.HasData(
            new User
            {
                Id = 9999,
                Username = "admin",
                FirstName = "admin",
                LastName = "admin",
                Patronymic = "admin",
                GroupName = "admin",
                Password = "!1AdMiN0?",
                RoleId = 1
            });
    }
}