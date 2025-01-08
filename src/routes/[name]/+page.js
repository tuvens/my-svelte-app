export function load({ params }) {
    // Define valid names
    const validNames = ['jon', 'daenerys', 'arya'];

    // Check if params.name is valid; fallback to 'Stranger' if not
    return {
        name: validNames.includes(params.name?.toLowerCase()) ? params.name : 'Stranger'
    };
}
  