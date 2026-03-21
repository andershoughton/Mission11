using Microsoft.EntityFrameworkCore;
using Mission11.Models;

namespace Mission11.Data;

public class BookContext : DbContext
{
    public BookContext(DbContextOptions<BookContext> options) : base(options) { }
    
    public DbSet<Book> Books { get; set; }
}