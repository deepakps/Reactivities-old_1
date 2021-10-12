using System;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Persistent;

namespace Application.Activities
{
    public class Delete
    {
        public class Commnad : IRequest
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Commnad>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                this._context = context;
            }

            public async Task<Unit> Handle(Commnad request, CancellationToken cancellationToken)
            {
                var activity = await _context.Activities.FindAsync(request.Id);

                if (activity != null)
                {
                    _context.Remove(activity);

                    await _context.SaveChangesAsync();
                }

                return Unit.Value;
            }
        }
    }
}