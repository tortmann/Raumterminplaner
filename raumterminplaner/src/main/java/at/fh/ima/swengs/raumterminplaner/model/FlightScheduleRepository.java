package at.fh.ima.swengs.raumterminplaner.model;

import org.springframework.data.repository.PagingAndSortingRepository;


public interface FlightScheduleRepository  extends PagingAndSortingRepository<FlightSchedule, Long> {
}
