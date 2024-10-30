#!/usr/bin/env python3
""" 1. LRU caching """


from base_caching import BaseCaching


class LRUCache(BaseCaching):
    """ Least Recently Used Strategy """

    def __init__(self):
        """ This is the constructor """
        super().__init__()

    def put(self, key, item):
        """ Add an item in the cacke """
        if key is not None and item is not None:
            self.cache_data[key] = item
            if len(self.cache_data) > BaseCaching.MAX_ITEMS:
                Least_used = next(iter(self.cache_data))
                del self.cache_data[Least_used]
                print("DISCARD: {}".format(Least_used))

    def get(self, key):
        """ Get an item by key """
        if key in self.cache_data:
            recently_value  =  self.cache_data.get(key)
            del self.cache_data[key]
            self.cache_data[key] = recently_value
        return self.cache_data.get(key)
