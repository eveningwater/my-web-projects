class XSet extends Set {
    union(...sets) {
        return XSet.union(this, ...sets)
    }
    intersection(...sets) {
        return XSet.intersection(this, ...sets);
    }
    difference(set) {
        return XSet.difference(this, set);
    }
    symmetricDifference(set) {
        return XSet.symmetricDifference(this, set);
    }
    cartesianProduct(set) {
        return XSet.cartesianProduct(this, set);
    }
    powerSet() {
        return XSet.powerSet(this);
    }
    // 返回两个或更多集合的并集
    static union(a, ...bSets) {
        const unionSet = new XSet(a);

        for (const b of bSets) {
            for (const bValue of b) {
                unionSet.add(bValue);
            }
        }

        return unionSet;
    }
    // 返回两个或更多集合的交集
    static intersection(a, ...bSets) {
        const intersectionSet = new XSet(a);
        for (const aValue of intersectionSet) {
            for (const b of bSets) {
                if (!b.has(aValue)) {
                    intersectionSet.delete(aValue);
                }
            }
        }

        return intersectionSet;
    }
    // 返回两个集合的差集
    static difference(a, b) {
        const differenceSet = new XSet(a);

        for (const bValue of b) {
            if (a.has(bValue)) {
                differenceSet.delete(bValue);
            }
        }
        return differenceSet;
    }
    // 返回两个集合的对称差集
    static symmetricDifference(a, b) {
        // 按照定义，对称差集可以表达为
        return a.union(b).difference(a.intersection(b));
    }
    // 返回两个集合（数组对形式）的笛卡儿积
    // 必须返回数组集合，因为笛卡儿积可能包含相同值的对
    static cartesianProduct(a, b) {
        const cartesianProductSet = new XSet();

        for (const aValue of a) {
            for (const bValue of b) {
                cartesianProductSet.add([aValue, bValue]);
            }
        }

        return cartesianProductSet;
    }
    // 返回一个集合的幂集
    static powerSet(a) {
        const powerSet = new XSet().add(new XSet());

        for (const aValue of a) {
            for (const set of new XSet(powerSet)) {
                powerSet.add(new XSet(set).add(aValue));
            }
        }
        return powerSet;
    }
}

const s1 = new Set().add(1).add(2).add(3);
const s2 = new Set().add(4).add(5).add(6);
const s3 = new XSet().union(s1, s2);
// console.log([...s3]); // [1,2,3,4,5,6]

const s4 = new Set().add(1).add(2).add(3).add(4);
const s5 = new Set().add(5).add(2).add(6).add(4);
const s6 = new XSet(s1).intersection(s4, s5);
console.log([...s6]); // [2]