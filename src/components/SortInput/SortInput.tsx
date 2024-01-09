interface SortInputProps {
    onChange: CallableFunction
}

const SortInput = ({onChange}: SortInputProps) => {
    return (
        <div>
            <label>Trier par :</label>
            <select onChange={(e)=>{onChange(e.target.value)}} name="sort" id="sort">
                <option value="label">Nom</option>
                <option value="year">Date</option>
                <option value="price">Prix</option>
            </select>
        </div>
    );
}

export default SortInput;