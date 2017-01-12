package at.fh.ima.swengs.raumterminplaner.model;

import org.springframework.data.repository.PagingAndSortingRepository;

public interface FlightBookingRepository  extends PagingAndSortingRepository<FlightBooking, Long> {
}
