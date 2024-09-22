# API Reference <a name="API Reference" id="api-reference"></a>

## Constructs <a name="Constructs" id="Constructs"></a>

### PatchLogGroups <a name="PatchLogGroups" id="patch-log-groups-multi-region.PatchLogGroups"></a>

#### Initializers <a name="Initializers" id="patch-log-groups-multi-region.PatchLogGroups.Initializer"></a>

```typescript
import { PatchLogGroups } from 'patch-log-groups-multi-region'

new PatchLogGroups(scope: Construct, id: string, props: PatchLogGroupsProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#patch-log-groups-multi-region.PatchLogGroups.Initializer.parameter.scope">scope</a></code> | <code>constructs.Construct</code> | *No description.* |
| <code><a href="#patch-log-groups-multi-region.PatchLogGroups.Initializer.parameter.id">id</a></code> | <code>string</code> | *No description.* |
| <code><a href="#patch-log-groups-multi-region.PatchLogGroups.Initializer.parameter.props">props</a></code> | <code><a href="#patch-log-groups-multi-region.PatchLogGroupsProps">PatchLogGroupsProps</a></code> | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="scope" id="patch-log-groups-multi-region.PatchLogGroups.Initializer.parameter.scope"></a>

- *Type:* constructs.Construct

---

##### `id`<sup>Required</sup> <a name="id" id="patch-log-groups-multi-region.PatchLogGroups.Initializer.parameter.id"></a>

- *Type:* string

---

##### `props`<sup>Required</sup> <a name="props" id="patch-log-groups-multi-region.PatchLogGroups.Initializer.parameter.props"></a>

- *Type:* <a href="#patch-log-groups-multi-region.PatchLogGroupsProps">PatchLogGroupsProps</a>

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#patch-log-groups-multi-region.PatchLogGroups.toString">toString</a></code> | Returns a string representation of this construct. |

---

##### `toString` <a name="toString" id="patch-log-groups-multi-region.PatchLogGroups.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#patch-log-groups-multi-region.PatchLogGroups.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |

---

##### ~~`isConstruct`~~ <a name="isConstruct" id="patch-log-groups-multi-region.PatchLogGroups.isConstruct"></a>

```typescript
import { PatchLogGroups } from 'patch-log-groups-multi-region'

PatchLogGroups.isConstruct(x: any)
```

Checks if `x` is a construct.

###### `x`<sup>Required</sup> <a name="x" id="patch-log-groups-multi-region.PatchLogGroups.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#patch-log-groups-multi-region.PatchLogGroups.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |

---

##### `node`<sup>Required</sup> <a name="node" id="patch-log-groups-multi-region.PatchLogGroups.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---


## Structs <a name="Structs" id="Structs"></a>

### PatchLogGroupsProps <a name="PatchLogGroupsProps" id="patch-log-groups-multi-region.PatchLogGroupsProps"></a>

#### Initializer <a name="Initializer" id="patch-log-groups-multi-region.PatchLogGroupsProps.Initializer"></a>

```typescript
import { PatchLogGroupsProps } from 'patch-log-groups-multi-region'

const patchLogGroupsProps: PatchLogGroupsProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#patch-log-groups-multi-region.PatchLogGroupsProps.property.regions">regions</a></code> | <code>string[]</code> | List of AWS regions in which the function should run. |
| <code><a href="#patch-log-groups-multi-region.PatchLogGroupsProps.property.schedule">schedule</a></code> | <code>aws-cdk-lib.aws_events.Schedule</code> | Schedule event for the event rule. |
| <code><a href="#patch-log-groups-multi-region.PatchLogGroupsProps.property.logGroupNamePrefix">logGroupNamePrefix</a></code> | <code>string</code> | Prefix for log group names that should be effected (e.g. "aws/lambda"). If not set, it will be ignored. |
| <code><a href="#patch-log-groups-multi-region.PatchLogGroupsProps.property.logsResources">logsResources</a></code> | <code>string[]</code> | Resource ARNs to add to the Lambda execution role policy statement. |
| <code><a href="#patch-log-groups-multi-region.PatchLogGroupsProps.property.retentionInDays">retentionInDays</a></code> | <code>number</code> | Number of days to which log retention should be set. |

---

##### `regions`<sup>Required</sup> <a name="regions" id="patch-log-groups-multi-region.PatchLogGroupsProps.property.regions"></a>

```typescript
public readonly regions: string[];
```

- *Type:* string[]

List of AWS regions in which the function should run.

---

##### `schedule`<sup>Required</sup> <a name="schedule" id="patch-log-groups-multi-region.PatchLogGroupsProps.property.schedule"></a>

```typescript
public readonly schedule: Schedule;
```

- *Type:* aws-cdk-lib.aws_events.Schedule

Schedule event for the event rule.

---

##### `logGroupNamePrefix`<sup>Optional</sup> <a name="logGroupNamePrefix" id="patch-log-groups-multi-region.PatchLogGroupsProps.property.logGroupNamePrefix"></a>

```typescript
public readonly logGroupNamePrefix: string;
```

- *Type:* string
- *Default:* no prefix

Prefix for log group names that should be effected (e.g. "aws/lambda"). If not set, it will be ignored.

---

##### `logsResources`<sup>Optional</sup> <a name="logsResources" id="patch-log-groups-multi-region.PatchLogGroupsProps.property.logsResources"></a>

```typescript
public readonly logsResources: string[];
```

- *Type:* string[]
- *Default:* "*" - all resources

Resource ARNs to add to the Lambda execution role policy statement.

If not set, the defaults will be used.

---

##### `retentionInDays`<sup>Optional</sup> <a name="retentionInDays" id="patch-log-groups-multi-region.PatchLogGroupsProps.property.retentionInDays"></a>

```typescript
public readonly retentionInDays: number;
```

- *Type:* number
- *Default:* 90 days

Number of days to which log retention should be set.

If not set, the defaults will be used.

---



