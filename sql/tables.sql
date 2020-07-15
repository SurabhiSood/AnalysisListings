drop table if exists zipcode;
drop table if exists map_details;

create table zipcode(
	id SERIAL primary key,
	neighbourhood VARCHAR(50)
);

create table map_details(
	id BIGINT primary key,
	name VARCHAR(500),
	host_id BIGINT,
	host_name VARCHAR(50),
	host_since VARCHAR(55),
	host_response_time VARCHAR(55),
	host_response_rate VARCHAR(55),
	host_acceptance_rate VARCHAR(55),
	host_is_superhost VARCHAR(55),
	city VARCHAR(55),
	zipcode VARCHAR(50),
	latitude double precision,
	longitude double precision,
	property_type VARCHAR(55),
	room_type VARCHAR(55),
	accommodates BIGINT,
	bathrooms double precision,
	bedrooms BIGINT,
	price BIGINT,
	security_deposit VARCHAR(55),
	cleaning_fee VARCHAR(55),
	review_scores_rating double precision,
	cancellation_policy VARCHAR(100)
);

SELECT * FROM map_details LIMIT 10;
SELECT * FROM zipcode;