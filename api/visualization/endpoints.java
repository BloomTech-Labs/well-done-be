swagger: '2.0'
info:
  description: |
    This is API for Well Done project
  version: 1.0.0
  title: Labs 17 - Well Done 
  termsOfService: http://swagger.io/terms/
  contact:
    email: apiteam@swagger.io
  license:
    name: Apache 2.0
    url: http://www.apache.org/licenses/LICENSE-2.0.html
# host: petstore.swagger.io
# basePath: /v2
tags:
- name: Pump
  description: Create, Read, Update, Delete pump
  # externalDocs:
  #   description: Find out more
  #   url: http://swagger.io
- name: Sensor
  description: Create, Read, Update, Delete sensor
- name: Account
  description: Create, Read, Update, Delete account
  # externalDocs:
  #   description: Find out more 
  #   url: http://swagger.io
# schemes:
# - http
paths:
  /api/pumps:
    post:
      tags:
      - Pump
      summary: Add a new pump
      operationId: addPump
      consumes:
      - application/json
      - application/xml
      produces:
      - application/json
      - application/xml
      parameters:
      - in: body
        name: body
        description: Pump object that needs to be added 
        required: true
        schema:
          $ref: '#/definitions/Pumps'
      responses:
        201:
          description: created successfully
        500:
          description: error
      # security:
      # - petstore_auth:
      #   - write:pets
      #   - read:pets
    get:
      tags:
      - Pump
      summary: Get all existing pumps
      operationId: getPumps
      consumes:
      - application/json
      - application/xml
      produces:
      - application/json
      - application/xml
      parameters:
      - in: body
        name: body
        description: Pump object that is received back 
        required: true
        schema:
            type: array
            items:
              $ref: '#/definitions/Pumps'
      responses:
        200:
          description: successful!
        400:
          description: Pumps not found
        
      # security:
      # - petstore_auth:
      #   - write:pets
      #   - read:pets
  /api/pump/{pumpId}:
    get:
      tags:
      - Pump
      summary: Find Pump By ID
      description: One pump is recalled at a time
      operationId: id
      produces:
      - application/json
      - application/xml
      parameters:
      - name: pumpId
        in: path
        description: ID of pump
        required: true
        type: integer
        format: int64
      # parameters:
      # - name: status
      #   in: query
      #   description: Status values that need to be considered for filter
      #   required: true
      #   type: array
      #   items:
      #     type: string
      #     enum:
      #     - available
      #     - pending
      #     - sold
      #     default: available
      #   collectionFormat: multi
      responses:
        200:
          description: successful! 
          schema:
            $ref: '#/definitions/Pumps'
        404:
          description: Pump does not exist
        500:
          description: error
      # security:
      # - petstore_auth:
      #   - write:pets
      #   - read:pets
    delete:
      tags:
      - Pump
      summary: Delete Pump By ID
      description: One pump is deleted at a time
      operationId: deletePumpById
      produces:
      - application/json
      - application/xml
      parameters:
      - name: pumpId
        in: path
        description: ID of pump 
        required: true
        type: integer
        format: int64
      responses:
        200:
          description: successful! 
          schema:
            $ref: '#/definitions/Pumps'
        404:
          description: Pump does not exist
    put:
      tags:
      - Pump
      summary: Update Pump By ID
      description: One pump is updated at a time
      operationId: updatePumpById
      produces:
      - application/json
      - application/xml
      parameters:
      - name: pumpId
        in: path
        description: ID of pump 
        required: true
        type: integer
        format: int64
      responses:
        200:
          description: successful! 
          schema:
            $ref: '#/definitions/Pumps'
        400:
          description: Error 
  /api/pumps/org/{orgId}:
    get:
      tags:
      - Pump
      summary: Find Pump By Org_ID
      description: One pump is recalled at a time
      operationId: orgId
      produces:
      - application/json
      - application/xml
      parameters:
      - name: orgId
        in: path
        description: ID of org
        required: true
        type: integer
        format: int64
      responses:
        200:
          description: successful! 
          schema:
            type: array
            items:
              $ref: '#/definitions/Pumps'
        400:
          description: Invalid
  /api/sensors:
    post:
      tags:
      - Sensor
      summary: Add a new sensor
      operationId: addSensor
      consumes:
      - application/json
      - application/xml
      produces:
      - application/json
      - application/xml
      parameters:
      - in: body
        name: body
        description: Sensor object that needs to be added 
        required: true
        schema:
          $ref: '#/definitions/SensorPOST'
      responses:
        200:
          description: successful!
        404:
          description: invalid input
        500:
          description: error
    get:
      tags:
      - Sensor
      summary: Get all sensors
      operationId: getSensors
      consumes:
      - application/json
      - application/xml
      produces:
      - application/json
      - application/xml
      parameters:
      - in: body
        name: body
        description: Sensors object that is retreived  
        required: true
        schema:
          $ref: '#/definitions/SensorsGET'
      responses:
        200:
          description: successful!
        500:
          description: error
  /api/sensor/{sensorId}:
    get:
      tags:
      - Sensor
      summary: Find sensor by ID
      description: Returns a single sensor
      operationId: getSensorById
      produces:
      - application/json
      - application/xml
      parameters:
      - name: sensorId
        in: path
        description: ID of sensor to return
        required: true
        type: integer
        format: int64
      responses:
        200:
          description: successful operation
          schema:
            $ref: '#/definitions/SensorPOST'
        404:
          description: Sensor does not exist
        500:
          description: error
      security:
      - api_key: []
    patch:
      tags:
      - Sensor
      summary: Updates a sensor 
      operationId: updateSensor
      consumes:
      - application/x-www-form-urlencoded
      produces:
      - application/json
      - application/xml
      parameters:
      - name: sensorId
        in: path
        description: ID of sensor that needs to be updated
        required: true
        type: integer
        format: int64
      # - name: name
      #   in: formData
      #   description: Updated name of the pet
      #   required: false
      #   type: string
      # - name: status
      #   in: formData
      #   description: Updated status of the pet
      #   required: false
      #   type: string
      responses:
        200:
          description: successful!
          schema:
            $ref: '#/definitions/SensorPOST'
        404:
          description: Sensor does not exist
        500:
          description: error
      # security:
      # - petstore_auth:
      #   - write:pets
      #   - read:pets
    delete:
      tags:
      - Sensor
      summary: Deletes a sensor
      operationId: deleteSensor
      produces:
      - application/json
      - application/xml
      parameters:
      # - name: api_key
      #   in: header
      #   required: false
      #   type: string
      - name: sensorId
        in: path
        description: Sensor id to delete
        required: true
        type: integer
        format: int64
      responses:
        200:
          description: successful!
          schema:
            $ref: '#/definitions/SensorPOST'
        404:
          description: Sensor does not exist
        500:
          description: error
      # security:
      # - petstore_auth:
      #   - write:pets
      #   - read:pets
  /api/sensors/org/{orgId}:
    get:
      tags:
      - Sensor
      summary: Find Pump By Org_ID
      description: One sensor is recalled at a time
      operationId: orgIdforSensor
      produces:
      - application/json
      - application/xml
      parameters:
      - name: orgId
        in: path
        description: ID of org
        required: true
        type: integer
        format: int64
      responses:
        200:
          description: successful! 
          schema:
           $ref: '#/definitions/SensorPOST'
        400:
          description: Invalid
  /api/accounts:
    post:
      tags:
      - Account
      summary: create an account
      operationId: createAccount
      # consumes:
      # - multipart/form-data
      parameters:
      - in: body
        name: body
        description: Account object that needs to be added 
        required: true
        schema:
          $ref: '#/definitions/Accounts'
      produces:
      - application/json
      responses:
        200:
          description: successful!
        500: 
          description: invalid input
    get:
      tags:
      - Account
      summary: get all accounts
      operationId: getAccounts
      # consumes:
      # - multipart/form-data
      produces:
      - application/json
      responses:
        200:
          description: successful!
        400:
          description: error
  /api/account/{accountId}:
    get:
      tags:
      - Account
      summary: Find account by ID
      description: Returns a single account
      operationId: getAccountById
      produces:
      - application/json
      - application/xml
      parameters:
      - name: accountId
        in: path
        description: ID of account to return
        required: true
        type: integer
        format: int64
      responses:
        200:
          description: successful operation
          schema:
            type: array
            items:
              $ref: '#/definitions/Accounts'
        404:
          description: Account not found
        500:
          description: error
    put:
      tags:
      - Account
      summary: Updates an account
      operationId: updateAccount
      consumes:
      - application/x-www-form-urlencoded
      produces:
      - application/json
      - application/xml
      parameters:
      - name: accountId
        in: path
        description: ID of account that needs to be updated
        required: true
        type: integer
        format: int64
      # - name: name
      #   in: formData
      #   description: Updated name of the pet
      #   required: false
      #   type: string
      # - name: status
      #   in: formData
      #   description: Updated status of the pet
      #   required: false
      #   type: string
      responses:
        200:
          description: successful 
          schema:
            $ref: '#/definitions/Accounts'
        400:
          description: error
      # security:
      # - petstore_auth:
      #   - write:pets
      #   - read:pets
    delete:
      tags:
      - Account
      summary: Deletes an account
      operationId: deleteAccount
      produces:
      - application/json
      - application/xml
      parameters:
      # - name: api_key
      #   in: header
      #   required: false
      #   type: string
      - name: accountId
        in: path
        description: Account id to delete
        required: true
        type: integer
        format: int64
      responses:
        200:
          description: successful!
        500:
          description: error
        
      # security:
      # - petstore_auth:
      #   - write:pets
      #   - read:pets 
  /api/orgs:
    post:
      tags:
      - Organization
      summary: create an organization
      operationId: createOrg
      # consumes:
      # - multipart/form-data
      parameters:
      - in: body
        name: body
        description: Organization object that needs to be added 
        required: true
        schema:
          $ref: '#/definitions/Organizations'
      produces:
      - application/json
      responses:
        200:
          description: successful!
        400:
          description: invalid input
    get:
      tags:
      - Organization
      summary: get all organizations
      operationId: getOrgs
      # consumes:
      # - multipart/form-data
      produces:
      - application/json
      responses:
        200:
          description: successful!
        404:
          description: error
  /api/orgs/{orgId}:
    get:
      tags:
      - Organization
      summary: Find org by ID
      description: Returns a single organization
      operationId: getOrgById
      produces:
      - application/json
      - application/xml
      parameters:
      - name: orgId
        in: path
        description: ID of org to return
        required: true
        type: integer
        format: int64
      responses:
        200:
          description: successful 
          schema:
            $ref: '#/definitions/Organizations'
        404:
          description: Org not found
        500:
          description: error
    put:
      tags:
      - Organization
      summary: Updates an organization
      operationId: updateOrg
      consumes:
      - application/x-www-form-urlencoded
      produces:
      - application/json
      - application/xml
      parameters:
      - name: orgId
        in: path
        description: ID of org that needs to be updated
        required: true
        type: integer
        format: int64
      # - name: name
      #   in: formData
      #   description: Updated name of the pet
      #   required: false
      #   type: string
      # - name: status
      #   in: formData
      #   description: Updated status of the pet
      #   required: false
      #   type: string
      responses:
        200:
          description: successful 
          schema:
            $ref: '#/definitions/Organizations'
        400:
          description: error
      # security:
      # - petstore_auth:
      #   - write:pets
      #   - read:pets
    delete:
      tags:
      - Organization
      summary: Deletes an organization
      operationId: deleteOrg
      produces:
      - application/json
      - application/xml
      parameters:
      # - name: api_key
      #   in: header
      #   required: false
      #   type: string
      - name: orgId
        in: path
        description: Org id to delete
        required: true
        type: integer
        format: int64
      responses:
        200:
          description: successful!
        500:
          description: error
        
      # security:
      # - petstore_auth:
      #   - write:pets
      #   - read:pets 
securityDefinitions:
  petstore_auth:
    type: oauth2
    authorizationUrl: http://petstore.swagger.io/oauth/dialog
    flow: implicit
    scopes:
      write:pets: modify pets in your account
      read:pets: read your pets
  api_key:
    type: apiKey
    name: api_key
    in: header
definitions:
  Accounts:
    type: object
    required:
    - first_name
    - last_name
    - email_address
    - password
    - super_user
    - org_user
    - org_admin
    properties:
      id:
        type: integer
        format: int64
      # account_type:
      #   $ref: '#/definitions/Account_types'
      org_id:
        type: integer
        format: int64
      first_name:
        type: string
        example: John
      last_name:
        type: string
        example: Smith
      email_address:
        type: string
        example: abc@gmail.com
      password:
        type: string
        example: 123abc@!@#
      mobile_number:
        type: string
        example: 774-290-3807
      super_user:
        type: boolean
        example: true
      org_user:
        type: boolean
        example: false
      org_admin:
        type: boolean
        example: false
  Organizations:
    type: object
    required:
    - org_name
    properties:
      id:
        type: integer
        format: int64
      org_name:
        type: string
      headquarter_city:
        type: string
  OrgInSensor:
    type: object
    required:
    - org_name
    properties:
      org_name:
        type: string
      headquarter_city:
        type: string
  Pumps:
    type: object
    required:
      - latitude
      - longitude
    properties:
      id:
        type: integer
        format: int64
      org_id: 
        type: integer
        format: int64
      country_name:
        type: string
        example: coountry
      province_name:
        type: string
        example: province
      district_name:
        type: string
        example: district
      commune_name:
        type: string
        example: commune
      latitude:
        type: number
        example: 1.2345
      longitude:
        type: number
        example: 6.7890
  PumpInSensor:
    type: object
    required:
      - latitude
      - longitude
    properties:
      pump_id:
        type: integer
        format: int64
      country_name:
        type: string
        example: coountry
      province_name:
        type: string
        example: province
      district_name:
        type: string
        example: district
      commune_name:
        type: string
        example: commune
      latitude:
        type: number
        example: 1.2345
      longitude:
        type: number
        example: 6.7890
      organization:
        $ref: '#/definitions/OrgInSensor' 
      
  History:
    type: object
    # required:
    # # - date
    properties:
      id:
        type: integer
        format: int64
      date:
        type: string
        format: date
        example: 2019-10-22
      count:
        type: integer
        format: int64
      total:
        type: integer
        format: int64
      status:
        type: integer
        format: int64
      sensor_id:
        type: integer
        format: int64
      pad_seconds:
        type: integer
        format: int64
      pad_counts:
        type: integer
        format: int64
      reported_percent:
        type: integer
        format: int64
  SensorsGET:
    type: object
    # required:
    # - sensor_ID
  
    properties:
      sensor_id:
        type: integer
        format: int64
      physical_id:
        type: integer
        format: int64
      kind:
        type: string
      type:
        type: string
      cellular:
        type: integer
        format: int64
      bluetooth:
        type: integer
        format: int64
      training:
        type: string
      remark:
        type: string
      data_finished:
        type: string
        # format: date
        example: yyyy-mm-dd
      depth:
        type: integer
        format: int64
      yeild:
        type: integer
        format: int64
      static:
        type: integer
        format: int64
      quality:
        type: string
      pump: 
        $ref: '#/definitions/PumpInSensor' 
    xml:
      name: Pump
     
  SensorPOST:
    type: object
    # required:
    # - sensor_ID
    properties:
      id:
        type: integer
        format: int64
      pump_id:
        type: integer
        format: int64
      physical_id:
        type: integer
        format: int64
      kind:
        type: string
      type:
        type: string
      cellular:
        type: integer
        format: int64
      bluetooth:
        type: integer
        format: int64
      training:
        type: string
      remark:
        type: string
      data_finished:
        type: string
        # format: date
        example: yyyy-mm-dd
      depth:
        type: integer
        format: int64
      yeild:
        type: integer
        format: int64
      static:
        type: integer
        format: int64
      quality:
        type: string
  # ApiResponse:
  #   type: object
  #   properties:
  #     code:
  #       type: integer
  #       format: int32
  #     type:
  #       type: string
  #     message:
  #       type: string
externalDocs:
  description: Find out more about Swagger
  url: http://swagger.io
# Added by API Auto Mocking Plugin
host: virtserver.swaggerhub.com
basePath: /Jessiehongtran/well-done/1.0.0
schemes:
 - https
 - http