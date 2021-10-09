using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Persistent;

namespace Application.Activities
{
    public class Create
    {
        public class Command : IRequest
        {
            public Activity Activity { get; set; }
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                this._context = context;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                _context.Activities.Add(request.Activity);

                await _context.SaveChangesAsync();

                //below line of code will not do anything. However, it will help understand controller that 
                //it has finished request processing.
                return Unit.Value;
            }
        }
    }
}