using Microsoft.EntityFrameworkCore;
using VSTU.Digital.Messenger.Domain.Entities;
using VSTU.Digital.Messenger.Infrastructure.Data.Configuration;

namespace VSTU.Digital.Messenger.Infrastructure.Data.Contexts;

public class MessengerDbContext : DbContext 
{

    public MessengerDbContext(DbContextOptions<MessengerDbContext> options) : base(options) => 
        AppContext.SetSwitch("Npgsql.EnableLegacyTimestampBehavior", true);

    public DbSet<Role> Roles { get; set; }
    public DbSet<User> Users { get; set; }
    public DbSet<UserChat> UserChats { get; set; }
    public DbSet<Message> Messages { get; set; }
    public DbSet<MessageContent> MessageContents { get; set; }
    public DbSet<Chat> Chats { get; set; }
    public DbSet<Group> Groups { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.ApplyConfiguration(new RoleConfiguration());
        modelBuilder.ApplyConfiguration(new UserConfiguration());
        modelBuilder.ApplyConfiguration(new UserChatConfiguration());
        modelBuilder.ApplyConfiguration(new MessageConfiguration());
        modelBuilder.ApplyConfiguration(new MessageContentConfiguration());
    }
}