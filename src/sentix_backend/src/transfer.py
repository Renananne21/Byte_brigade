
@update
def book_ticket(request: BookingRequest) -> BookingResponse:
    # Generate a simple booking ID (you might want to use a more sophisticated method)
    booking_id = f"{request.user}_{request.date}_{len(bookings)}"
    
    # Calculate cost (this is a placeholder, replace with your actual pricing logic)
    cost_per_ticket = 100  # Example cost in tokens
    total_cost = request.num_tickets * cost_per_ticket
    
    # In a real application, you would check available tickets, handle payment, etc.
    # For this example, we'll just store the booking
    bookings[booking_id] = {
        "user": request.user,
        "date": request.date,
        "num_tickets": request.num_tickets,
        "total_cost": total_cost
    }
    
    return BookingResult(booking_id=booking_id, total_cost=total_cost)
