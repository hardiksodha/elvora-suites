INSERT INTO rooms (room_number, room_type, price_per_night, floor, capacity, description, status) VALUES
('101', 'SINGLE', 80.00, 1, 1, 'Cozy single room with garden view', 'AVAILABLE'),
('102', 'SINGLE', 80.00, 1, 1, 'Cozy single room with street view', 'AVAILABLE'),
('201', 'DOUBLE', 120.00, 2, 2, 'Spacious double room with city view', 'AVAILABLE'),
('202', 'DOUBLE', 120.00, 2, 2, 'Spacious double room with pool view', 'AVAILABLE'),
('203', 'TWIN', 115.00, 2, 2, 'Twin room with two single beds', 'AVAILABLE'),
('301', 'SUITE', 250.00, 3, 3, 'Luxury suite with panoramic view', 'AVAILABLE'),
('302', 'DELUXE', 180.00, 3, 2, 'Deluxe room with premium amenities', 'AVAILABLE'),
('401', 'PRESIDENTIAL', 500.00, 4, 4, 'Presidential suite with private terrace', 'AVAILABLE');

INSERT INTO guests (first_name, last_name, email, phone, address, id_type, id_number) VALUES
('James', 'Wilson', 'james.wilson@email.com', '+1-555-0101', '123 Main St, New York', 'PASSPORT', 'P123456'),
('Sarah', 'Johnson', 'sarah.j@email.com', '+1-555-0102', '456 Oak Ave, Chicago', 'DRIVING_LICENSE', 'DL789012'),
('Michael', 'Brown', 'mbrown@email.com', '+44-20-7946-0958', '10 Baker St, London', 'PASSPORT', 'GB345678');
