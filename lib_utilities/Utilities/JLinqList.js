class JLinqList
{
    listGeneric = null;

    constructor(list)
    {
        this.listGeneric = list;
    }

    ToList() { return this.listGeneric; }
    AsEnumerable() { return this.listGeneric; }
    Cast() { return this.OfType(); }
    OfType() { return this.listGeneric; }
    ToArray() { return this.listGeneric; }
    ToDictionary(expresion) { return this.listGeneric.map(x => [expresion(x), x]); }

    Where(expresion)
    {
        if (expresion == null)
            return this;
        var temp = this.listGeneric.filter(expresion);
        return new JLinqList(temp);
    }

    Select(expresion= null)
    {
        var response = [];
        var temp = this.listGeneric.filter(expresion);
        for (var pos in this.listGeneric)
        {
            var item = this.listGeneric[pos];
            response.push(temp.some(x => x == item));
        }
        return response;
    }

    SelectMany(expresion= null) { return this.listGeneric.map(expresion); }
    
    OrderBy(expresion)
    {
        var temp = [...this.listGeneric];
        return temp.sort((x1, x2) => expresion(x1, x2) ? 1 : (expresion(x2, x1) ? -1 : 0));
    }

    OrderByDescending(expresion) { return this.OrderBy(expresion).reverse(); }
    
    Join(list)
    {
        var response = [...this.listGeneric];
        for (var pos in list)
        {
            var item = list[pos];
            response.push(item);
        }
        return response;
    }

    Any(expresion) { return this.listGeneric.some(expresion); }

    All(expresion)
    {
        var temp = this.listGeneric.filter(expresion);
        return this.listGeneric.length == temp.length;
    }

    Contains(entity) { return this.listGeneric.some(x => x == entity); }

    GroupBy(expresion) { return this.ToLookup(expresion); }

    ToLookup(expresion)
    {
        var response = [];
        var temp = this.listGeneric.map(expresion);
        // v: value, i: index, a: array
        for (var pos in temp.filter((v, i, a) => a.indexOf(v) === i))
        {
            var item = temp[pos];
            var data = {};
            data[item] = temp.filter(x => x == item).length;
            response.push(data);
        }
        return response;
    }

    Take(size)
    {
        var response = [];
        var count = 0;
        for (var pos in this.listGeneric)
        {
            count++;
            response.push(this.listGeneric[pos]);
            if (count >= size)
                break;
        }
        return new JLinqList(response);
    }
    
    Skip(size)
    {
        var response = [];
        var count = 0;
        for (var pos in this.listGeneric)
        {
            count++;
            if (count <= size)
                continue;
            response.push(this.listGeneric[pos]);
        }
        return new JLinqList(response);
    }
    
    TakeWhile(expresion)
    {
        return this.Where(expresion);
    }
    
    SkipWhile(expresion)
    {
        if (expresion == null)
            return this;

        var temp = this.listGeneric.filter(x => !expresion(x));
        return new JLinqList(temp);
    }

    Union(list)
    {
        return new JLinqList(this.Join(list));
    }

    Distinct()
    {
        return new JLinqList(this.listGeneric.filter((v, i, a) => a.indexOf(v) === i));
    }

    Intersect(expresion) { return new JLinqList(this.listGeneric.filter(expresion)); }
    
    Except(list)
    {
        return new JLinqList(this.listGeneric.filter(x => list.some(y => x != y)));
    }
    
    First(expresion)
    {
        return this.FirstOrDefault(expresion);
    }

    FirstOrDefault(expresion)
    {
        if (expresion == null)
        {
            if (this.listGeneric.length == 0)
                return null;
            return this.listGeneric[0];
        }
        var temp = this.listGeneric.filter(expresion);
        if (temp.length == 0)
            return null;
        return temp[0];
    }

    Last(expresion)
    {
        return this.LastOrDefault(expresion);
    }

    LastOrDefault(expresion)
    {
        if (expresion == null)
        {
            if (this.listGeneric.length == 0)
                return null;
            return this.listGeneric[this.listGeneric.length - 1];
        }
        var temp = this.listGeneric.filter(expresion);
        if (temp.length == 0)
            return null;
        return temp[temp.length - 1];
    }

    ElementAt(position)
    {
        return this.ElementAtOrDefault(position);
    }

    ElementAtOrDefault(position)
    {
        if (position > this.listGeneric.length)
            return null;    
        return this.listGeneric[position];
    }
    
    Single(expresion)
    {
        return this.SingleOrDefault(expresion);
    }

    SingleOrDefault(expresion)
    {
        var temp = this.Where(expresion).ToList();
        if (temp.length > 1)
            throw "The list has more than one item";
        return temp[0];
    }

    Count(expresion)
    {
        if (expresion == null)
            return this.listGeneric.length;

        var temp = this.listGeneric.filter(expresion);
        return temp.length;
    }

    Sum(expresion)
    {
        var temp = this.listGeneric.map(expresion);
        var response = 0;
        for (var pos in temp)
            response = response + temp[pos];
        return response;
    }

    Min(expresion)
    {
        var temp = this.listGeneric.map(expresion);
        if (temp.length == 0)
            return 0;
        var response = temp[0];
        for (var pos in temp)
        {
            if (response <= temp[pos])
                continue;
            response = temp[pos];
        }
        return response;
    }

    Max(expresion)
    {
        var temp = this.listGeneric.map(expresion);
        if (temp.length == 0)
            return 0;
        var response = temp[0];
        for (var pos in temp)
        {
            if (response >= temp[pos])
                continue;
            response = temp[pos];
        }
        return response;
    }

    Average(expresion)
    {
        var temp = this.listGeneric.map(expresion);
        var sum = this.Sum(expresion);
        return sum / temp.length;
    }

    Index(expresion)
    {
        var count = 0;
        var index = -1; 
        if (expresion == null)
            return index;
        
        for (var pos in this.listGeneric)
        {
            var item = this.listGeneric[pos];
            if (expresion(item))
            {
                index = count;
                break;
            }
            count++
        }
	    return index;
    }
}

module.exports = JLinqList;