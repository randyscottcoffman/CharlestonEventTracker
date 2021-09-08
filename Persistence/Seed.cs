using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;
using Microsoft.AspNetCore.Identity;

namespace Persistence
{
    public class Seed
    {
        public static async Task SeedData(DataContext context,
            UserManager<AppUser> userManager)
        {
            if (!userManager.Users.Any() && !context.Activities.Any())
            {
                var users = new List<AppUser>
                {
                    new AppUser
                    {
                        DisplayName = "Test",
                        UserName = "test",
                        Email = "test@test.com"
                    },
                    new AppUser
                    {
                        DisplayName = "Bill",
                        UserName = "bill",
                        Email = "bill@test.com"
                    },
                    new AppUser
                    {
                        DisplayName = "Scott",
                        UserName = "scott",
                        Email = "scott@test.com"
                    },
                };

                foreach (var user in users)
                {
                    await userManager.CreateAsync(user, "Pa$$w0rd");
                }

                var activities = new List<Activity>
                {
                    new Activity
                    {
                        Title = "Past Activity 1",
                        Date = DateTime.Now.AddMonths(-2),
                        Description = "Activity 2 months ago",
                        Category = "drinks",
                        City = "Charleston",
                        Venue = "Pub",
                        Attendees = new List<ActivityAttendee>
                        {
                            new ActivityAttendee
                            {
                                AppUser = users[0],
                                IsHost = true
                            }
                        }
                    },
                    new Activity
                    {
                        Title = "Past Activity 2",
                        Date = DateTime.Now.AddMonths(-1),
                        Description = "Activity 1 month ago",
                        Category = "culture",
                        City = "Charleston",
                        Venue = "The Louvre",
                        Attendees = new List<ActivityAttendee>
                        {
                            new ActivityAttendee
                            {
                                AppUser = users[0],
                                IsHost = true
                            },
                            new ActivityAttendee
                            {
                                AppUser = users[1],
                                IsHost = false
                            },
                        }
                    },
                    new Activity
                    {
                        Title = "Test Event 1",
                        Date = DateTime.Now.AddMonths(1),
                        Description = "Test event 1 month in future",
                        Category = "music",
                        City = "Charleston",
                        Venue = "Sullivan's Records",
                        Attendees = new List<ActivityAttendee>
                        {
                            new ActivityAttendee
                            {
                                AppUser = users[2],
                                IsHost = true
                            },
                            new ActivityAttendee
                            {
                                AppUser = users[1],
                                IsHost = false
                            },
                        }
                    },
                    new Activity
                    {
                        Title = "Test Event 2",
                        Date = DateTime.Now.AddMonths(2),
                        Description = "test event 2 months in future",
                        Category = "food",
                        City = "Charleston",
                        Venue = "Hale House",
                        Attendees = new List<ActivityAttendee>
                        {
                            new ActivityAttendee
                            {
                                AppUser = users[0],
                                IsHost = true
                            },
                            new ActivityAttendee
                            {
                                AppUser = users[2],
                                IsHost = false
                            },
                        }
                    },
                    new Activity
                    {
                        Title = "Test Event 3",
                        Date = DateTime.Now.AddMonths(3),
                        Description = "Test event 3 months in future",
                        Category = "drinks",
                        City = "Charleston",
                        Venue = "Sam's",
                        Attendees = new List<ActivityAttendee>
                        {
                            new ActivityAttendee
                            {
                                AppUser = users[1],
                                IsHost = true                            
                            },
                            new ActivityAttendee
                            {
                                AppUser = users[0],
                                IsHost = false                            
                            },
                        }
                    },
                    new Activity
                    {
                        Title = "Test Event 4",
                        Date = DateTime.Now.AddMonths(4),
                        Description = "Test event 4 months in future",
                        Category = "culture",
                        City = "Charleston",
                        Venue = "West Virginia State Museum",
                        Attendees = new List<ActivityAttendee>
                        {
                            new ActivityAttendee
                            {
                                AppUser = users[1],
                                IsHost = true                            
                            }
                        }
                    },
                    new Activity
                    {
                        Title = "Test Event 5",
                        Date = DateTime.Now.AddMonths(5),
                        Description = "Test event 5 months in future",
                        Category = "drinks",
                        City = "Charleston",
                        Venue = "Vinos",
                        Attendees = new List<ActivityAttendee>
                        {
                            new ActivityAttendee
                            {
                                AppUser = users[0],
                                IsHost = true                            
                            },
                            new ActivityAttendee
                            {
                                AppUser = users[1],
                                IsHost = false                            
                            },
                        }
                    },
                    new Activity
                    {
                        Title = "Test Event 6",
                        Date = DateTime.Now.AddMonths(6),
                        Description = "Test event 6 months in future",
                        Category = "travel",
                        City = "Charleston",
                        Venue = "Hampton Inn",
                        Attendees = new List<ActivityAttendee>
                        {
                            new ActivityAttendee
                            {
                                AppUser = users[1],
                                IsHost = true                            
                            }
                        }
                    },
                };

                await context.Activities.AddRangeAsync(activities);
                await context.SaveChangesAsync();
            }
        }
    }
}
