# map

- The zero value of a map is nil. A nil map has no keys, nor can keys be added.

- var m map[string]Vertex
  - m = make(map[string]Vertex)
  - m["Bell Labs"] = Vertex{
      40.68433, -74.39967,
    }

- literal
  var m = map[string]Vertex{
    "Bell Labs": Vertex{
      40.68433, -74.39967,
    }
  }
  var m = map[string]Vertex{
    "Bell Labs": {40.68433, -74.39967},
    "Google":    {37.42202, -122.08408},
  }

- delete(m, key)
- elem, ok = m[key]
  - If key is in m, ok is true. If not, ok is false.
  - If key is not in the map, then elem is the zero value for the map's element type.
