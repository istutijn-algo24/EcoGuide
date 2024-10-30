module 0x2495388a20d202da293b3e49cc5ba3d83f951048e6a2be9f461513b5d74d9ec9::CarbonFootprint {

    use 0x1::signer; // Import the signer module

    struct Footprint has store, key {
        footprint_value: u64,
    }

    /// Initializes the user's footprint data with a value of 0, if not already created.
    public fun initialize_footprint(owner: &signer) {
        if (!exists<Footprint>(signer::address_of(owner))) {
            move_to(owner, Footprint { footprint_value: 0 });
        }
    }

    /// Records additional footprint value for the user.
    public fun record_footprint(owner: &signer, value: u64) acquires Footprint {
        let footprint_data = borrow_global_mut<Footprint>(signer::address_of(owner));
        footprint_data.footprint_value = footprint_data.footprint_value + value;
    }

    /// Gets the current footprint value for the given user address.
    public fun get_footprint(owner: address): u64 acquires Footprint {
        if (exists<Footprint>(owner)) {
            let footprint_data = borrow_global<Footprint>(owner);
            footprint_data.footprint_value
        } else {
            0
        }
    }
}